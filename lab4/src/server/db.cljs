(ns server.db
  (:require [cljs.reader]))

(def default-db {:active-page :home})

(def json
"[
    1,
    \"str\",
    {
        \"type\": \"object\",
        \"value\": \"null\"
    }
]")