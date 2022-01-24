function PageLayout(props: any) {
	return (
		<main className={`mx-auto max-w-6xl xl:p-0 px-4 ${props.className}`}>
			{props.children}
		</main>
	)
}

export default PageLayout
