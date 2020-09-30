(ns server.core
  (:require
   [reagent.core :as reagent]
   [server.router :as router]
   [server.events]
   [server.subs]
   [server.views]))

(defn ^:export init
  []
  (router/start!)
  (reagent/render [server.views/server-app]
    (.getElementById js/document "app")))
