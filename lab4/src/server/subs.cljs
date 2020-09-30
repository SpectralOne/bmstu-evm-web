(ns server.subs
  (:require [re-frame.core :refer [reg-sub]]))

(reg-sub
 :active-page
 (fn [db _]
   (:active-page db)))

(reg-sub
 :form
 (fn [db _]
   (:form db)))

(reg-sub
 :result
 (fn [db _]
   (:result db)))
