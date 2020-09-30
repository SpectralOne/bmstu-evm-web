(ns server.views
  (:require [reagent.core :as reagent]
            [server.router :refer [url-for]]
            [re-frame.core :refer [subscribe dispatch]]))

(defn format-date
  [date]
  (.toDateString (js/Date. date)))

(defn header
  []
  [:header
    [:a {:href (url-for :home) :class "home-url"} "Lab 4"]])

(defn home
  []
   [:ul
    [:li
     [:a {:href (url-for :task1) :class "a"} "Task 1"]]
    [:li
     [:a {:href (url-for :task2) :class "a"} "Task 2"]]
    [:li
     [:a {:href (url-for :task3) :class "a"} "Task 3"]]
    [:li
     [:a {:href (url-for :task4) :class "a"} "Task 4"]]])

(defn task1
  []
  (let [default {:a "" :b "" :c ""}
        data (reagent/atom default)]
    (fn []
      (let [{:keys [a b c]} @data
            task1 (fn [event data]
                    (.preventDefault event)
                    (dispatch [:task1 data]))]
        [:form {:on-submit #(task1 % @data)}
        [:h1 "Task 1. Max out of 3 values."]
         [:input {:type        "text"
                  :placeholder "A"
                  :value       a
                  :on-change   #(swap! data assoc :a (-> % .-target .-value))}]
         [:br]
         [:input {:type        "text"
                  :placeholder "B"
                  :value       b
                  :on-change   #(swap! data assoc :b (-> % .-target .-value))}]
         [:br]
         [:input {:type        "text"
                  :placeholder "C"
                  :value       c
                  :on-change   #(swap! data assoc :c (-> % .-target .-value))}]
         [:br]
         [:button "go!"]]))))

(defn task2
  []
  (let [default {:idx "" }
        data (reagent/atom default)]
    (fn []
      (let [{:keys [idx]} @data
            task2 (fn [event data]
                    (.preventDefault event)
                    (dispatch [:task2 data]))]
        [:form {:on-submit #(task2 % @data)}
         [:h1 "Task 2. Get by index."]
         [:input {:type        "text"
                  :placeholder "Index"
                  :value       idx
                  :on-change   #(swap! data assoc :idx (-> % .-target .-value))}]
         [:br]
         [:button "go!"]]))))

(defn result
  []
  (let [res @(subscribe [:result])]
    [:ul
     [:li
      [:p.t1 "Result: " + (str res)]]]))

(defn task3
  []
  (let [default {:fields "" :address ""}
        data (reagent/atom default)]
    (fn []
      (let [{:keys [fields address]} @data
            task3 (fn [event data]
                    (.preventDefault event)
                    (dispatch [:task3 data]))]
        [:form {:on-submit #(task3 % @data)}
         [:h1 "Task 3. Form generator."]
         [:input {:type        "text"
                  :placeholder "Enter fields separated by space"
                  :value       fields
                  :on-change   #(swap! data assoc :fields (-> % .-target .-value))}]
         [:br]
         [:input {:type        "text"
                  :placeholder "Enter address"
                  :value       address
                  :on-change   #(swap! data assoc :address (-> % .-target .-value))}]
         [:br]
         [:button "go!"]]))))

(defn form
  []
  (let [form @(subscribe [:form])]
    [:div {:dangerouslySetInnerHTML {:__html form}}]))

(defn task4
  []
  (let [default {:a "" :b "" :c ""}
        data (reagent/atom default)]
    (fn []
      (let [{:keys [a b c]} @data
            task4 (fn [event data]
                    (.preventDefault event)
                    (dispatch [:task4 data]))]
        [:form {:on-submit #(task4 % @data)}
         [:h1 "Task 4. [A, B] mod C == 0"]
         [:input {:type        "text"
                  :placeholder "A"
                  :value       a
                  :on-change   #(swap! data assoc :a (-> % .-target .-value))}]
         [:br]
         [:input {:type        "text"
                  :placeholder "B"
                  :value       b
                  :on-change   #(swap! data assoc :b (-> % .-target .-value))}]
         [:br]
         [:input {:type        "text"
                  :placeholder "C"
                  :value       c
                  :on-change   #(swap! data assoc :c (-> % .-target .-value))}]
         [:br]
         [:button "go!"]]))))

(defn pages [page-name]
  (case page-name
    :home [home]
    :task1 [task1]
    :task2 [task2]
    :task3 [task3]
    :task4 [task4]
    :result [result]
    :form [form]
    [home]))

(defn server-app
  []
  (let [active-page @(subscribe [:active-page])]
    [:div
     [header]
     [pages active-page]]))
    ;;  [footer]
     
