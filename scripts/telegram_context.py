#!/usr/bin/env python3
"""Private project context receiver. Python standard library only."""
import argparse
import getpass
import json
import os
from pathlib import Path
import sqlite3
import sys
import time
import urllib.error
import urllib.request


def select_message(update, chat_id):
    for kind in ('message', 'edited_message', 'channel_post', 'edited_channel_post'):
        message = update.get(kind, {})
        if message.get('chat', {}).get('id') == chat_id:
            text = message.get('text', message.get('caption'))
            if text is not None:
                return (message['message_id'], message.get('edit_date', message['date']), text)
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--chat-id', type=int)
    parser.add_argument('--state-dir', type=Path,
                        help='Private directory outside any website/document root')
    parser.add_argument('--check', action='store_true', help='Check bot, webhook and group without consuming updates')
    parser.add_argument('--check-token', action='store_true', help='Verify token and webhook only; no updates consumed')
    parser.add_argument('--sole-receiver', action='store_true', help='Confirm no other process polls this bot')
    args = parser.parse_args()
    if not args.check_token and (args.chat_id is None or args.state_dir is None):
        parser.error('--chat-id and --state-dir are required unless using --check-token')
    root = Path(__file__).resolve().parents[1]
    state = args.state_dir.expanduser().resolve() if args.state_dir else None
    if state is not None and (state == root or root in state.parents):
        parser.error('State must be outside the website repository.')
    token = os.environ.get('TELEGRAM_BOT_TOKEN') or getpass.getpass('Bot token (hidden): ')

    def api(method, **params):
        request = urllib.request.Request(
            'https://api.telegram.org/bot' + token + '/' + method,
            data=json.dumps(params).encode(), headers={'Content-Type': 'application/json'})
        try:
            with urllib.request.urlopen(request, timeout=40) as response:
                result = json.load(response)
        except urllib.error.HTTPError as error:
            raise RuntimeError('Telegram HTTP error ' + str(error.code)) from None
        except (urllib.error.URLError, TimeoutError):
            raise RuntimeError('Telegram connection failed; no credentials logged.') from None
        if not result.get('ok'):
            raise RuntimeError('Telegram rejected the request.')
        return result['result']

    bot = api('getMe')
    webhook = api('getWebhookInfo')
    if args.check_token:
        print('Token verified for @' + bot.get('username', '(unnamed bot)'))
        print('Existing webhook: ' + ('yes; integrate with its receiver' if webhook.get('url') else 'no'))
        return
    if webhook.get('url'):
        raise RuntimeError('Existing webhook detected. Integrate with its receiver instead; nothing changed.')
    chat = api('getChat', chat_id=args.chat_id)
    if chat['type'] not in ('group', 'supergroup', 'channel'):
        raise RuntimeError('Select a project group or channel, not a personal chat.')
    member = api('getChatMember', chat_id=args.chat_id, user_id=bot['id'])
    if member['status'] in ('left', 'kicked'):
        raise RuntimeError('Add the bot to the chosen chat first.')
    if chat['type'] != 'channel' and member['status'] != 'administrator' and not bot.get('can_read_all_group_messages'):
        raise RuntimeError('Bot cannot read normal group messages. Make it an admin or configure privacy mode.')
    print('Bot and project chat verified; no webhook configured.', flush=True)
    if args.check:
        return
    if not args.sole_receiver:
        parser.error('Confirm no other polling receiver before using --sole-receiver.')
    os.umask(0o077)
    state.mkdir(parents=True, exist_ok=True, mode=0o700)
    os.chmod(state, 0o700)
    import fcntl
    lock = (state / 'receiver.lock').open('w')
    try:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        raise RuntimeError('A receiver is already running in this state directory.') from None
    with sqlite3.connect(state / 'context.sqlite3') as db:
        db.execute('CREATE TABLE IF NOT EXISTS messages (chat_id INTEGER, message_id INTEGER, date INTEGER, text TEXT, PRIMARY KEY(chat_id, message_id))')
        db.execute('CREATE TABLE IF NOT EXISTS cursor (id INTEGER PRIMARY KEY CHECK(id=1), offset INTEGER)')
        print('Receiving project text and captions. Stop with Ctrl-C.', flush=True)
        while True:
            row = db.execute('SELECT offset FROM cursor WHERE id=1').fetchone()
            params = {'timeout': 25}
            if row:
                params['offset'] = row[0]
            # Preserve the existing allowed_updates setting for this shared Mini App bot.
            updates = api('getUpdates', **params)
            with db:
                for update in updates:
                    message = select_message(update, args.chat_id)
                    if message:
                        db.execute('INSERT OR REPLACE INTO messages VALUES (?, ?, ?, ?)', (args.chat_id, *message))
                    db.execute('INSERT OR REPLACE INTO cursor VALUES (1, ?)', (update['update_id'] + 1,))
            if not updates:
                time.sleep(1)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        pass
    except RuntimeError as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
