n = int(input("請輸入一個大於1的數字 n: "))

if n > 1:
    i = 1
    while i <= n:
        j = 1
        while j <= n:
            print(f"{i}*{j}={i * j}")
            j += 1
        i += 1
else:
    print("輸入的數字必須大於1")
