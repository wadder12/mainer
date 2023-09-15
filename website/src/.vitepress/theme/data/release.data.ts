import { defineLoader } from "vitepress"
import { Octokit } from "@octokit/rest"
import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types"

const octokit = new Octokit()

type GitHubRelease = GetResponseDataTypeFromEndpointMethod<typeof octokit.repos.getLatestRelease>

export interface AppRelease {
	stable: GitHubRelease
	preview: GitHubRelease
}

declare const data: AppRelease
export { data }

export default defineLoader({
	async load(): Promise<AppRelease> {
		const { data: stable } = await octokit.repos.getLatestRelease({
			owner: "wadder12",
			repo: "QuantaAI-Projects",
		})

		const { data: preview } = await octokit.repos.getLatestRelease({
			owner: "wadder12",
			repo: "QuantaAI-Projects"
		})

		return { stable, preview }
	},
})
