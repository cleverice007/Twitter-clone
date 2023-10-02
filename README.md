# Twitter-clone
復刻twitter 的主要功能，學習react、mongodb、API使用，最後部署到heroku上
[Live Demo on Heroku](https://twitter-clone-mason-4bfa1e4cdc08.herokuapp.com/register)


# Twitter Clone README

## 註冊和登入功能
![loginform](https://github.com/cleverice007/Twitter-clone/blob/main/%E6%88%AA%E5%9C%96%202023-10-02%20%E4%B8%8B%E5%8D%882.37.43.png?raw=true)

### 前端

#### 使用的技術

- **React**: 主要的前端框架。
- **React Hooks**: 特別是使用了 `useState` 來管理表單的狀態。

#### 主要功能和實現：

1. **表單處理**：利用 React 的狀態管理來維護用戶輸入。
2. **事件處理**：有專門的函數來處理表單的各種事件，如文字變更。
3. **與後端交互**：使用 `fetch API` 發送 POST 請求到後端 API。

---

### 後端

#### 使用的技術

- **Node.js**: 作為後端運行環境。
- **Express**: 用作 Web 框架。
- **MongoDB**: 用作資料庫，專門儲存用戶資料。
- **JSON Web Tokens (JWT)**: 用於用戶身份驗證。

#### 主要功能和實現：

1. **用戶註冊**：能夠接受新用戶註冊，並將資料存儲在 MongoDB 中。
2. **用戶登入**：通過 JWT 生成 token，實現用戶身份驗證。
3. **錯誤處理**：能夠適當地返回錯誤訊息。


# 推文功能
**組件結構**
-推文發佈表單: 一個專門用於創建和發送新推文的React組件。
-推文列表: 顯示所有用戶（或特定用戶）的推文。
-推文詳情頁面: 用於顯示單一推文和其相關回覆。

**功能流程**
-用戶輸入與交互
-推文發佈表單會監聽用戶的輸入。
-使用者可以在表單中輸入推文內容，點擊“發送”按鈕。
-後端通信
-當用戶發送推文、回覆或按讚時，前端會發送對應的HTTP請求到後端服務。
-使用例如 axios 或 fetch 來進行HTTP請求。
**狀態與界面更新**

-獲得後端響應後，前端將更新相應的狀態和數據。例如，新增一條推文到推文列表，或更新推文的按讚數量。

# 設定資料和個人資料編輯
**前端**
#### 使用的技術
- React: 主要用於創建 UI 元素。
-React Hooks: 用於狀態管理，例如 useState。
-FormData API: 用於包裝用戶上傳的文件。
-CSS Modules: 實現局部範疇的 CSS。
- Context API：useUser 用於獲取和設置用戶資料

#### 主要功能和實現：
**圖片上傳**: 使用兩個不同的組件來分別處理個人頭像和背景圖片的上傳。
**預覽功能**: 使用 URL.createObjectURL() 來實現上傳前的圖片預覽。
**狀態管理**: 使用 React 的 useState 來存儲上傳的文件和用戶的自我介紹。
**提交表單**: 在 handleSubmit 函數中使用 fetch API 發送 PUT 請求，並用 FormData 包裝上傳的文件和文本字段。
**全局狀態管理**: 通過 Context API 的 useUser Hook 來獲取和設置用戶的資料。

  
**後端**
#### 使用的技術
-Mongoose: 用於 MongoDB 資料庫的資料操作。
-AWS S3: 用於存儲用戶上傳的個人頭像和背景圖片。

#### 主要功能和實現：
**身份驗證**: 使用 JWT 從 Authorization 頭部獲取並驗證用戶的身份。
**圖片存儲**: 將用戶上傳的 profileImage 和 backgroundImage 存儲在 AWS S3 bucket中，並從 S3 獲取 URL 以存儲在 MongoDB 中。
**資料更新**: 使用 findByIdAndUpdate 方法從 MongoDB 更新用戶資料。

# 追蹤他人（新增/取消）：
**前端**
- 使用 React 創建追蹤功能的介面，例如追蹤按鈕和追蹤列表。
- 監聽用戶的點擊事件並發送相關請求到後端，例如新增追蹤或取消追蹤的操作。
- 更新前端的狀態和顯示，例如更新追蹤數量和追蹤狀態。
- 
**後端**
- 設計追蹤相關的路由和控制器，用於處理追蹤他人的操作。
- 設計數據庫模型（使用 MongoDB）來儲存追蹤關係的數據。
- 實現相關的 CRUD 操作，例如新增追蹤或取消追蹤。



