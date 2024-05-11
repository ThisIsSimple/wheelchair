### SET
---
Flask + MAP API(Google, Naver, TMAP, Odsay) 사용
SSH (letsencrypt -> key.pem, cert.pem 생성 후 flask port 443(authbind) 설정)

### /geocoding (POST)

---

- json 예시

```json
{
    "start": "경기도 수원시 영통구 영통동 994-6",
    "end": "경기도 용인시 기흥구 서천동 1",
    "option": "30"
}
```

### /direction (POST)

---

- json 예시
    
    ```json
    {
        "start": [37.2465227, 127.0776834],
        "end": [37.2432813, 127.0798264],
        "option": "30"
    }
    ```
    

### /near (POST)

---

- json 예시
    
    ```json
    {
    	"food": "삼겹살", 
    	"lat": "37.24585640190518", 
    	"lon": "127.07885102859649"
    }
    ```
    

### /split (POST)

---

- json 예시
    
    ```json
    {
        "start": [37.4694247, 126.9665424],
        "end": [37.2385886, 127.0846743]
    }
    ```
