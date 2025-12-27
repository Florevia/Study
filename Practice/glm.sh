#!/bin/bash

export api_key='ms-6daa7666-8692-4bf5-a7c4-f90a2b672c51'

curl "https://api-inference.modelscope.cn/v1/messages" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${api_key}" \
    -d '{
        "model": "ZhipuAI/GLM-4.7",
        "messages": [
            {
                "role": "user",
                "content": "你好"
            }
        ],
    }' | jq -r .