prev_hash="none"
pid=-1
command="python3 -m http.server 8080"
while (true) do
  sleep .100
  new_hash=$(find . -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum)
  if [[ $prev_hash != $new_hash ]]; then
    echo "CHANGES_DETECTED!"
    prev_hash=$new_hash
    if [[ $pid != -1 ]]; then
      kill $pid
      echo -e "\t$pid : KILLED"
    fi
    $command &
    pid=$!
    echo -e "\t$pid : SERVER_UP"
  fi
done

