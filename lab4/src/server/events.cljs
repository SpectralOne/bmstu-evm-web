(ns server.events
  (:require
   [server.db]
   [day8.re-frame.http-fx]
   [clojure.string :refer [split]]
   [re-frame.core  :refer [reg-event-fx]]
   [cljs.reader    :refer [read-string]]))

(reg-event-fx
 :set-active-page
 (fn [{:keys [db]} [_ {:keys [page]}]]
   (let [set-page (assoc db :active-page page)]
     {:db set-page})))

(defn get-max [data]
  ((key (apply max-key val data)) data))

(defn get-by-idx [idx]
 (let [parsed (js->clj
               (.parse js/JSON server.db/json))]
   (parsed (read-string (:idx idx)))))

(defn form-header [address]
  (str "<form method=\"POST\" action=\"" address "\">"))

(defn label [field]
  (str "<input type= \"text\" placeholder=\"" field "\" name= \"" field "\" > <br>"))

(defn form-body [fields]
  (let [fields    (apply str (map #(str (label %)) fields))
        submit    "<input type= \"submit\" >"
        close-tag "</form>"]
    (str fields submit close-tag)))

(defn gen-html [fields address]
  (let [caption (str "<h1>Address = "address"</h1>")
        header  (form-header address)
        body    (form-body fields)]
    (str caption header body)))

(defn parse-input [vals]
  (let [fields  (split (:fields vals) " ")
        address-tmp (:address vals)
        address     (if-not (= (first address-tmp) "/")
                      (str "/" address-tmp)
                      address-tmp)]
    (gen-html fields address)))

(defn range-mod [vals]
  (let [a (read-string (:a vals))
        b (read-string (:b vals))
        c (read-string (:c vals))]
    (filter #(= (mod % c) 0) (range a (+ b 1) 1))))
 
(reg-event-fx
 :task1
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:result] (get-max vals))
    :dispatch [:set-active-page {:page :result}]}))

(reg-event-fx
 :task2
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:result] (get-by-idx vals))
    :dispatch [:set-active-page {:page :result}]}))

(reg-event-fx
 :task3
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:form] (parse-input vals))
    :dispatch [:set-active-page {:page :form}]}))

(reg-event-fx
 :task4
 (fn [{:keys [db]} [_ vals]]
   {:db (assoc-in db [:result] (range-mod vals))
    :dispatch [:set-active-page {:page :result}]}))
