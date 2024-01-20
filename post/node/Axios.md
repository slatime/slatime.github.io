axois
- interceptors request/response 작업
<br>`then`또는 `catch`로 처리되기 전에 요청과 응답을 가로챌 수 있다.

```ts
import { AxiosInstance } from 'axios';

// request intercept
axios.interceptors.request.use(
    (config) => {
        // TODO: 요청 전달되 기 전 작업처리
        // ex) 헤더에 토큰 담기
        config.headers.common['Authorization'] = 'Bearer ' + accessToken;
        
        return config;
    },
    (error) => {
        Promise.reject(error);    
    }   
)

// response intercept
axios.interceptors.response.use(
    (response) => {
        // ex)
        const originalRequestHead = response.data.head;
        const originalRequestBody = response.data.body;
        
        return response;
    },
    (error) => {
        Promise.reject(error);
    }
)


```
