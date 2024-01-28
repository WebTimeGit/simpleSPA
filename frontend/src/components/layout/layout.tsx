import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import styles from './publicLayout.module.scss'


export const Layout = ({children}: Readonly<{ children: React.ReactNode; }>) => {


	return (
		<div className={styles.layout}>
			<Header />
			<main className={styles.main}>
				{children}
			</main>
			<Footer />
		</div>
	)
}
