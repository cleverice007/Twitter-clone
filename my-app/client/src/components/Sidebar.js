import styles from '../css/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>首頁</li>
        <li>個人資料</li>
      </ul>
    </div>
  );
}

export default Sidebar;
