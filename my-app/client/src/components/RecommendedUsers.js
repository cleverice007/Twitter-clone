import styles from '../css/RecommendedUsers.module.css';

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
