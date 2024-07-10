import Image from 'next/image'
import empty from '@/images/empty.png'
import styles from './components.module.scss'

const Empty = () => {
  return (
    <div className={styles.empty}>
      <Image src={empty} alt='empty' className={styles.empty__image} />
      <div className={styles.empty__info}>
        <h3 className={styles.empty__title}>You don&apos;t have tasks registered yet</h3>
        <p className={styles.empty__text}>Create tasks and organize your to-do items</p>
      </div>
    </div>
  )
}

export default Empty