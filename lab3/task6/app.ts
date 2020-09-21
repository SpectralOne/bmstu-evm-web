function assign(obj: any, keyPath: string[], value: any): void {
  let lastKeyIndex: number = keyPath.length - 1;
  for (let i = 0; i < lastKeyIndex; i++) {
    let key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = {}
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
}

function gen_keypath(n: number): string[] {
  let res: string[] = [];
  for (let index = 0; index < n; index++) {
    res.push(index.toString())    
  }
  return res;
}

function test_depth(): void {
  let obj: any = {};
  let cnt: number = 0;

  try {
    while (JSON.stringify(obj)) {
      cnt++;
      assign(obj, gen_keypath(cnt), {})
      console.log(cnt);
    }
  } catch (error) {
    console.log(error);
  }
  console.log(`Res: ${cnt}`);
}

test_depth();
