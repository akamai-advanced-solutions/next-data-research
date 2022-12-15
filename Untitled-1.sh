
#!/bin/bash

eval "$(
  curl https://api.github.com/gists/968b8937a153127cfae4a173b6000c1e |
  jq -r '
    .files |
    to_entries |
    .[].value |
    @sh "echo \(.content) > \(.filename)"
  '
)"