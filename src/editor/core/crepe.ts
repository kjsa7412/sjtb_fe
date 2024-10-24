import { Editor, defaultValueCtx, editorViewOptionsCtx, rootCtx } from '@milkdown/kit/core'
import {commonmark} from '@milkdown/kit/preset/commonmark'
import { gfm } from '@milkdown/kit/preset/gfm'
import { history, historyProviderConfig } from '@milkdown/kit/plugin/history'
import { indent, indentConfig } from '@milkdown/kit/plugin/indent'
import { getMarkdown } from '@milkdown/kit/utils'
import { clipboard } from '@milkdown/kit/plugin/clipboard'
import { trailing } from '@milkdown/kit/plugin/trailing'

import type { DefaultValue } from '@milkdown/kit/core'
import type { CrepeFeatureConfig } from '../feature'

import { CrepeFeature, defaultFeatures, loadFeature } from '../feature'
import { configureFeatures } from './slice'

export interface CrepeConfig {
  features?: Partial<Record<CrepeFeature, boolean>>
  featureConfigs?: CrepeFeatureConfig
  root?: Node | string | null
  defaultValue?: DefaultValue
}

export class Crepe {
  static Feature = CrepeFeature
  readonly #editor: Editor
  readonly #initPromise: Promise<unknown>
  readonly #rootElement: Node
  #editable = true

  constructor({
    root,
    features = {},
    featureConfigs = {},
    defaultValue = '',
  }: CrepeConfig) {
    const enabledFeatures = Object
      .entries({
        ...defaultFeatures,
        ...features,
      })
      .filter(([, enabled]) => enabled)
      .map(([feature]) => feature as CrepeFeature)

    this.#rootElement = (typeof root === 'string' ? document.querySelector(root) : root) ?? document.body
    this.#editor = Editor.make()
      .config(configureFeatures(enabledFeatures))
      .config((ctx) => {
        ctx.set(rootCtx, this.#rootElement)
        ctx.set(defaultValueCtx, defaultValue)
        ctx.set(editorViewOptionsCtx, {
          editable: () => this.#editable,
        })
        ctx.set(historyProviderConfig.key, {
          depth: 12, // 원하는 depth 값
          newGroupDelay: 120, // 원하는 newGroupDelay 값
        })
        ctx.update(indentConfig.key, value => ({
          ...value,
          size: 4,
        }))

        // listItem 수정 방안
        // ctx.set(listItemAttr) 이런식으로 메소드 하나씩 까보면 나올꺼 같은데
        // 근데 이상하게 https://milkdown.vercel.app/docs/recipes/react 여기선 또 잘됨
        /// crepe 소스 자체 문제인것으로 추측
      })
      .use(commonmark)
      .use(history)
      .use(indent)
      .use(trailing)
      .use(clipboard)
      .use(gfm)

    const promiseList: Promise<unknown>[] = []

    enabledFeatures.forEach((feature) => {
      const config = (featureConfigs as Partial<Record<CrepeFeature, never>>)[feature]
      promiseList.push(
        loadFeature(feature, this.#editor, config),
      )
    })

    this.#initPromise = Promise.all(promiseList)
  }

  async create() {
    await this.#initPromise
    return this.#editor.create()
  }

  async destroy() {
    await this.#initPromise
    return this.#editor.destroy()
  }

  get editor(): Editor {
    return this.#editor
  }

  setReadonly(value: boolean) {
    this.#editable = !value
    return this
  }

  getMarkdown() {
    return this.#editor.action(getMarkdown())
  }
}
