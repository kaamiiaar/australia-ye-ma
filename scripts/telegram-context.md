# Private project Telegram context

This optional, standard-library Python receiver is for the owner's project discussion group. It is separate from the static Mini App and public community research. It sends no messages and publishes no content.

Add the bot to the project group as an administrator with minimal rights, and tell participants their text will be retained locally for project context. Alternatively disable group privacy through BotFather and re-add the bot. A linked discussion group is a separate chat from its channel.

Use a replacement token from BotFather if the original was shared in chat. Enter it at the hidden prompt; never put it in source, shell arguments, or the website directory. Rotation also requires updating any existing service using the old token.

Obtain the numeric project chat ID, then check access:

```sh
python3 scripts/telegram_context.py --chat-id YOUR_CHAT_ID --state-dir /private/tmp/australia-ye-ma-context --check
```

The check does not consume updates or modify webhooks. If an existing webhook is detected, add the context storage to that service instead. Telegram cannot identify other long-polling processes: establish that none exists before starting this receiver. A Mini App link configured in BotFather alone does not need a polling process.

Run in a named tmux session to keep it alive after the terminal disconnects:

```sh
tmux new -s australia-ye-ma-context
python3 scripts/telegram_context.py --chat-id YOUR_CHAT_ID --state-dir /private/tmp/australia-ye-ma-context --sole-receiver
```

Detach using Ctrl-B then D. The temporary directory may be removed by the OS; choose a permanent private directory outside all served folders for durable storage. Never serve this directory. The database stores only the selected chat's message IDs, timestamps, text and captions, with edits replacing the stored text. Author identities, attachments, and unrelated chat text are not stored. Text may still contain personal information.

This receiver consumes the bot's update queue, including unrelated updates it discards. It is suitable only when no other bot logic needs those updates. It preserves Telegram's current allowed_updates setting; if messages were previously excluded, that configuration needs review before use.

No historical backfill is available. Pending updates may include recent messages from before startup. Telegram retains undelivered updates for at most 24 hours; laptop sleep or downtime can cause gaps. Deleted Telegram messages are not automatically removed from the local database. Stop the receiver before deleting its private state to clear stored context. Codex reads the database when asked; receipt alone does not start a Codex task or notification.

Validate connection with a new group text message and inspect the local database for that message before treating setup as complete.

References: [Telegram Bot FAQ](https://core.telegram.org/bots/faq), [Bot API](https://core.telegram.org/bots/api#getupdates).
