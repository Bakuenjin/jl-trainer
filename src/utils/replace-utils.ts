type ReplaceConfig = { from: string, to: string, replaceAll?: boolean }[]

export function replacePattern(text: string, from: string, to: string): string {
	while(text.includes(from))
		text = text.replace(from, to)
	return text
}

export function replacePatternList(text: string, replaceConfig: ReplaceConfig) {
	replaceConfig.forEach(config => {
        text =  config.replaceAll ?
            replacePattern(text, config.from, config.to) :
            text.replace(config.from, config.to)
	})
	return text
}