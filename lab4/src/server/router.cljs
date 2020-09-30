(ns server.router
  (:require [bidi.bidi :as bidi]
            [pushy.core :as pushy]
            [re-frame.core :refer [dispatch]]))

(def routes
  ["/" {""           :home
        "task1" { "" :task1
                  "/result" :result }
        "task2" { "" :task2
                  "/result" :result }
        "task3" { "" :task3
                 "/result" :form }
        "task4" { "" :task4
                 "/result" :result}}])

(def history
  (let [dispatch #(dispatch [:set-active-page {:page      (:handler %)
                                               :slug      (get-in % [:route-params :slug])}])
        match #(bidi/match-route routes %)]
    (pushy/pushy dispatch match)))

(defn start!
  []
  (pushy/start! history))

(def url-for (partial bidi/path-for routes))

(defn set-token!
  [token]
  (pushy/set-token! history token))
