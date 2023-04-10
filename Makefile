.PHONY: build install serve update-libs dev lint format test e2e-test vitest

install:
	pnpm i

build:
	pnpm build

serve:
	pnpm serve

dev:
	pnpm dev

lint: format
	pnpm format:check
	pnpm lint
	pnpm ts:check
	pnpm format:check

format:
	pnpm format

test: e2e-test vitest

vitest:
	pnpm test

e2e-test:
	pnpm e2e

update-libs:
	pnpm up -L -i

