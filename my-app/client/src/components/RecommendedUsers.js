import styles from '../css/RecommendedUsers.module.css';


  // 推薦先暫時根據創建帳號順序，做前10名的推薦

const RecommendedUsers = ({ users }) => {
  return (
    <div className={styles.recommendedUsers}>
      <h2>Recommended Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>{user.username}</p>
            <p>Name: {user.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecommendedUsers;
