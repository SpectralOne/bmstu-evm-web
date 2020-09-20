let i: number = 1;

function f() {
  console.log(i++);
  if (i < 11) {
    setTimeout(f, 2000);
  } else if (i >= 10 && i < 21) {
    setTimeout(f, 1000);
  } else {
    i = 1;
    setTimeout(f, 2000);
  }
}

f();