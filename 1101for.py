n = int(input("請輸入一個大於1的數字 n: "))

if n > 1:
    for i in range(1, n + 1):
        for j in range(1, n + 1):
            print(f"{i}*{j}={i * j}")
else:
    print("輸入的數字必須大於1")
