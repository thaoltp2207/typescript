import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Nhập số nguyên dương n
function kiemTraSoTuNhien(): Promise<number> {
  return new Promise((resolve) => {
    rl.question("Nhập số phần tử n: ", (input) => {
      const n = parseInt(input);
      if (isNaN(n) || n <= 0) {
        console.log("Vui lòng nhập số nguyên dương.");
        resolve(kiemTraSoTuNhien());
      } else {
        resolve(n);
      }
    });
  });
}

// Nhập mảng số tự nhiên
function nhapMangSoTuNhien(nPhanTu: number, mangHienTai: number[] = []): Promise<number[]> {
  return new Promise((resolve) => {
    const remaining = nPhanTu - mangHienTai.length;
    rl.question("Nhập " + remaining +" số tự nhiên (cách nhau khoảng trắng): ", (input) => {
      const parts = input.trim().split(/\s+/).map(Number);
      const validNumbers: number[] = [];
      // Kiem tra so nhap
      for (let i = 0; i < parts.length; i++) {
        const num = parts[i];
        if (Number.isInteger(num) && num >= 0) {
          validNumbers.push(num);
        }
      }

      const updated = mangHienTai.concat(validNumbers).slice(0, nPhanTu);
      if (updated.length < nPhanTu) {
        console.log("Đã nhập " + updated.length + " số tự nhiên. Cần nhập thêm " +  (nPhanTu - updated.length) + " số tự nhiên nữa.");
        resolve(nhapMangSoTuNhien(nPhanTu, updated));
      } else {
        resolve(updated);
      }
    });
  });
}

// Kiểm tra số hoàn hảo
function isPerfectNumber(n: number): boolean {
  if (n <= 1) return false;
  let sum = 1;
  for (let i = 2; i <= Math.floor(n / 2); i++) {
    if (n % i === 0) sum = sum + i;
  }
  return sum === n;
}

// Kiểm tra số nguyên tố
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function tongSoHoanHao(arr: number[]): number {
   let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (isPerfectNumber(arr[i])) {
      sum = sum + arr[i];
    }
  }
  return sum;
}

function tichSoNguyenTo(arr: number[]): number {
  let product = 1;
  let hasPrime = false;

  for (let i = 0; i < arr.length; i++) {
    if (isPrime(arr[i])) {
      product = product * arr[i];
      hasPrime = true;
    }
  }

  return hasPrime ? product : 0; // Nếu không có số nguyên tố nào thì trả về 0
}
// Tìm số lớn thứ 2 trong mảng
function timSoLonThuHai(arr: number[]): number | null {
  if (arr.length < 2) return null;

  let max1 = -1;
  let max2 = -1;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (num > max1) {
      max2 = max1;
      max1 = num;
    } else if (num > max2 && num < max1) {
      max2 = num;
    }
  }

  return max2 === -1 ? null : max2;
}

// Tìm vị trí trong mảng
function timViTriSoLonThuHaiTrongMang(arr: number[], target: number): number {
  const indexes: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
     return i;
    }
  }
  return -1;
}


// Tổng các số ở vị trí lẻ
function tongSoOViTriLe(arr: number[]): number {
  let sum = 0;

  for (let i = 1; i < arr.length; i = i + 2) {
    sum = sum + arr[i];
  }

  return sum;
}

// Xử lý mảng
function processArray(arr: number[]): void {
  // Tổng các số hoàn hảo
  const sumPerfect = tongSoHoanHao(arr);

  // Tích các số nguyên tố
  const productPrime = tichSoNguyenTo(arr)

  // Tìm số lớn thứ 2
  const secondLargest = timSoLonThuHai(arr);

  let secondLargestIndexes = 0;
  if(secondLargest != null) {
    secondLargestIndexes = timViTriSoLonThuHaiTrongMang(arr, secondLargest);
  }
  
  // Tổng các số ở vị trí lẻ (index lẻ)
  const sumOddIndex = tongSoOViTriLe(arr);

  // In kết quả
  console.log("KẾT QUẢ XỬ LÝ MẢNG:");
  console.log("Tổng các số hoàn hảo:", sumPerfect);
  console.log("Tích các số nguyên tố:", productPrime);
  if (secondLargestIndexes > 0 ) {
    console.log("Số lớn thứ 2:", secondLargest);
    console.log("Vị trí xuất hiện:", secondLargestIndexes);
  } else {
    console.log("Không có số lớn thứ 2");
  }
  console.log("Tổng các số ở vị trí lẻ:", sumOddIndex);
}

// Chạy chương trình
async function main() {
  const n = await kiemTraSoTuNhien();
  const numbers = await nhapMangSoTuNhien(n);
  console.log("Mảng đã nhập:", numbers);
  processArray(numbers);
  rl.close();
}

main();
