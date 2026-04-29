; define and use the tax function
(ns taxation)

; compute the tax amount
(defn tax [amount rate]
  (* amount (/ rate 100.0)))

; switch to the application namespace
(in-ns 'application)
; load core functions
(clojure.core/refer 'clojure.core)
; print the result
(println (format "%.2f" (taxation/tax 117 7)))
