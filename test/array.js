const arr = new Array(9);
console.log(arr);
for (ele of arr) {
    console.log(ele);
};

arr.splice(1, 1, 'Hello');
console.log(arr);

let sentinel = 0
for (index in arr) {
    console.log(index);
    arr.splice(index, 1, ++sentinel);
};

console.log

console.log(arr);

console.log(arr[0]);

console.log(0 == []);

const thisArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
for (let i = 1; i <= thisArr.length; ++i) {
    console.log(thisArr.at(i - 1).at((i * -1)));
};

for (let i = 0; i < thisArr.length; ++i) {
    console.log(thisArr[i][i])
};

for (let i = 0; i < thisArr.length; ++i) {
    for (let j = 0; j < thisArr.length; ++j) {
        console.log(thisArr[j][i]);
    };
};