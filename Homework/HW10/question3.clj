; read and convert the temperatures
(ns question3
  (:require [clojure.string :as str]))

; read the file and parse the values
(let [temps (map #(Double/parseDouble %) (str/split-lines (slurp "temperatures.txt")))
      ; convert each value to celsius
      celsius (map #(* (- % 32) (/ 5.0 9)) temps)]
  ; print the minimum
  (println "min= " (apply min celsius))
  ; print the maximum
  (println "max= " (apply max celsius))
  ; print the average
  (println "avg= " (/ (reduce + celsius) (count celsius))))
