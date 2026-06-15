"""
uv venv
uv pip install websocket-client
uv run python ./test-napcat-api.py
"""

import json
import websocket  

ws = websocket.create_connection("ws://192.168.31.51:13000/?access_token=dev")
# https://napcat.apifox.cn/226656931e0
ws.send(json.dumps({
    "action": "set_group_special_title",
    "params": {
        "group_id": 958366323,
        "user_id": 1830540513,
        "special_title": "我是sb",
        "duration": 0
    },
    "echo": "test"
}))
print(ws.recv())
ws.close()
