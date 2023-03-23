.PHONY: build install serve update-libs dev

install:
	pnpm i

build:
	pnpm build

serve:
	pnpm serve

dev:
	pnpm dev

update-libs:
	pnpm up -L -i

