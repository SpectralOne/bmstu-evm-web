fib(1, 1) :- !.
fib(2, 1) :- !.
fib(N, F) :-
        N > 2,
        N1 is N-1,
        N2 is N-2,
        fib(N1, F1),
        fib(N2, F2),
        F is F1+F2.

nfib(1,1) :- !.
nfib(1,2) :- !.
nfib(F, N) :- N is floor(2.078087*log(F)+1.672276).

rangefibplus(N2, N2) :- fib(N2, F), write(F), write(".").
rangefibplus(N1, N2) :- N1 < N2, fib(N1,F), write(F), write(","), N is N1 + 1, rangefibplus(N, N2).

rangefib(A,B) :- nfib(A, N1), nfib(B, N2), fib(N1,F1), fib(N2,F2), A > F1, B < F2, N11 is N1 + 1, N22 is N2 -1, rangefibplus(N11, N22), !.
rangefib(A,B) :- nfib(A, N1), nfib(B, N2), fib(N1,F1), A > F1, N11 is N1 + 1, rangefibplus(N11, N2), !.
rangefib(A,B) :- nfib(A, N1), nfib(B, N2), fib(N2,F2), B < F2, N22 is N2 -1, rangefibplus(N1, N22), !.
rangefib(A,B) :- nfib(A, N1), nfib(B, N2), rangefibplus(N1, N2).

start() :-
        read(A), nl,
        read(B), nl,
        rangefib(A, B).
