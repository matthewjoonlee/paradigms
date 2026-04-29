; build the squares
(let [n (Integer/parseInt (first *command-line-args*))
      ; square each number
      squares (map #(* % %) (range 1 (inc n)))]
  ; print the squares
  (doseq [square squares]
    (println square))
  ; print the total
  (println "Sum =" (reduce + squares)))
