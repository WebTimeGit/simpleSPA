import { Container } from "@/components/container";
import styles from './header.module.scss';
import Image from "next/image";
import Link from "next/link";
import {openRoutes, ROUTES} from "@/routes/routes";
import { useAuthContext } from "@/context/authContext";

export const Header = () => {
	const { isAuth, logout, userData } = useAuthContext()

	const onHandleLogout = () => logout()

	const path =
		!isAuth && !openRoutes.find((route) => route.path === ROUTES.subscribe)
			? ROUTES.auth.login : ROUTES.subscribe


	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.headerWrapper}>
					<Link href={ROUTES.home} className={styles.logo}>
						<Image src={'/logo.png'} width={50} height={50} alt={'WebTime Logo'} />
						WebTime
					</Link>

					<ul className={styles.menu}>
						<li>
							<Link href={path} className={styles.logoLong}>
								Subscribe
							</Link>
						</li>
					</ul>

					<div>
						{isAuth ? (
							<>
								<span>{userData?.username}</span>
								<button className={styles.login} onClick={onHandleLogout} aria-label="Logout">
									Logout
								</button>
							</>

						) : (
							<>
								<Link href={ROUTES.auth.login} className={styles.login}>
									Login
								</Link>
								/
								<Link href={ROUTES.auth.registration} className={styles.login}>
									Registration
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</header>
	)
}
