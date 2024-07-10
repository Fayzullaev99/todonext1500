import styles from './components.module.scss'

const Info = ({data}) => {
  return (
    <div className={styles.info}>
      <div className={styles.info__left}>
        <h3 className={styles.info__title}>Tasks created</h3>
        <p className={styles.info__number}>{data.length}</p>
      </div>
      <div className={styles.info__right}>
        <h3 className={styles.info__title}>Completed</h3>
        <p className={styles.info__number}>{data.filter(todo => todo.check).length} / {data.length}</p>
      </div>
    </div>
  )
}

export default Info