# Changelog

## [0.3.1](https://github.com/ZeroOneJs/markdown-design/compare/vue-markdown-design-v0.3.0...vue-markdown-design-v0.3.1) (2026-01-28)


### Bug Fixes

* **search:** stabilize input element ID to prevent unnecessary updates ([2917e42](https://github.com/ZeroOneJs/markdown-design/commit/2917e42f4b99f0dc8a6aebc780f5858c840d25b7))

## [0.3.0](https://github.com/ZeroOneJs/markdown-design/compare/vue-markdown-design-v0.2.0...vue-markdown-design-v0.3.0) (2026-01-18)


### Features

* allow target prop to accept getter functions ([e666812](https://github.com/ZeroOneJs/markdown-design/commit/e66681242e03ef0a25b4bb4c0f0abdb11b89f039))
* enhance component type definitions for better TypeScript support ([d7e4b27](https://github.com/ZeroOneJs/markdown-design/commit/d7e4b2732ef7ae997c39856723b43d7c3c725dbd))
* expose htmlStr for precise component updates ([1b77711](https://github.com/ZeroOneJs/markdown-design/commit/1b777119c5a4bab4a6282a32ffef44d460a9841c))
* extract array conversion logic to utility function ([b145844](https://github.com/ZeroOneJs/markdown-design/commit/b145844564be3d0c2b0a63e63241ff678b239848))
* improve global offset handling logic ([7fce74b](https://github.com/ZeroOneJs/markdown-design/commit/7fce74ba34229c2e0e39c26ad9da6d6a60661a6b))
* limit scroll behavior to innermost container only ([92be818](https://github.com/ZeroOneJs/markdown-design/commit/92be8188ab99f3ed5ed5fb583ebc4f444dc86e1e))
* lower z-index values and replace them with CSS variables ([f26261b](https://github.com/ZeroOneJs/markdown-design/commit/f26261b8f367998daff4e9493ee44fc19527626d))
* **markdown:** adjust mini-screen-width for better tablet experience ([1b1635f](https://github.com/ZeroOneJs/markdown-design/commit/1b1635f7659dfcade0313c90a7fdbcb3093da88c))
* **markdown:** optimize toc scrollbar behavior ([ca06484](https://github.com/ZeroOneJs/markdown-design/commit/ca064849c0b3b28e043dce4699558a23553d44d5))
* **render:** renamed preset to presetName and improved markdown-it configuration consistency ([6d8c79b](https://github.com/ZeroOneJs/markdown-design/commit/6d8c79b9d041bd84e1e6df14185714082783b4c0))
* **render:** replace getMdit function with direct mdInstance exposure for markdown-it instance ([6f69444](https://github.com/ZeroOneJs/markdown-design/commit/6f69444b6032c5f73f0fecba27de02d48c8b9689))
* **search:** improve search component data feedback ([7c4749f](https://github.com/ZeroOneJs/markdown-design/commit/7c4749f5c16f721cbfb96511a5d824d9a3081e49))
* **search:** remove default target fallback to reduce page intrusiveness ([36c36c9](https://github.com/ZeroOneJs/markdown-design/commit/36c36c97118732d06564e70c4b5a341477eda361))
* **toc:** consolidate slot rendering for both anchor and plain text toc items ([8c4a22d](https://github.com/ZeroOneJs/markdown-design/commit/8c4a22db5633dfc10be99c622a9376bdb34e9f92))
* **toc:** improve vertical layout for empty state in markdown component ([82e96c0](https://github.com/ZeroOneJs/markdown-design/commit/82e96c03490bed1e69378b4a5d7bcc78f708b97a))


### Bug Fixes

* **markdown:** add missing array type for show-btn prop ([78ef142](https://github.com/ZeroOneJs/markdown-design/commit/78ef14251569ad21205f161e8472c82b95082ae3))
* **markdown:** resolve inconsistency between show-btn prop and button display ([06e3c7b](https://github.com/ZeroOneJs/markdown-design/commit/06e3c7b0fa5c2417de543bcb3dbbf7fee51f7b84))
* remove unused import ([c1d3dd8](https://github.com/ZeroOneJs/markdown-design/commit/c1d3dd8b6c1252fcee14cca021aee04610ab6414))
* **render:** restructure wrapper layout to resolve white background spacing issues ([5e099e4](https://github.com/ZeroOneJs/markdown-design/commit/5e099e43a74182df71bcd99b226a4fa2886103c2))
* **search:** add required id attribute to input element ([5de6e27](https://github.com/ZeroOneJs/markdown-design/commit/5de6e27e787c05513d280400a9a542cd748e47ea))
* **search:** keyword selection fails during md updates ([a7a07ec](https://github.com/ZeroOneJs/markdown-design/commit/a7a07ecbddc4b4c604c2a00cd0784e86b89ea042))
* **search:** prevent search input overflow on mobile devices ([e8d22a8](https://github.com/ZeroOneJs/markdown-design/commit/e8d22a85984ea2ad94abfb311204455ab08068e4))
* **sticky:** resolve mobile toc click issue caused by interactive button overlay ([98282c0](https://github.com/ZeroOneJs/markdown-design/commit/98282c059719630650580c2d84cf6528c7234ff5))
* **toc:** enhance scroll positioning accuracy for hash navigation ([d965c47](https://github.com/ZeroOneJs/markdown-design/commit/d965c47541be0f6269070b5394e9859b74817307))
* **toc:** ensure correct active item in toc after DOM mutations ([41fb40a](https://github.com/ZeroOneJs/markdown-design/commit/41fb40a2f755b5970352b45bd59d4106c20f7a07))
* **toc:** improve toc generation for content within collapsible elements (e.g., &lt;details&gt;) ([66eccac](https://github.com/ZeroOneJs/markdown-design/commit/66eccaccd12b1202f11b52749f568eb435fd4c7b))
* **toc:** incorrect active state when anchor is disabled ([cc892a1](https://github.com/ZeroOneJs/markdown-design/commit/cc892a16c23aa49a121072af97011c392c61c377))
* **toc:** prevent plain text items from being selected when markdown prop is enabled ([86946f9](https://github.com/ZeroOneJs/markdown-design/commit/86946f9e10ca4fc7c205c82d142818f8ec409dc1))
* **toc:** remove duplicated properties in TOCItem type ([b05c1f8](https://github.com/ZeroOneJs/markdown-design/commit/b05c1f85ee756fe68d6c25c04433c931db62e01d))
* **toc:** styles not applied when toc is empty ([6180510](https://github.com/ZeroOneJs/markdown-design/commit/6180510ca14becbc744f5b7844daba7cf071279d))


### Performance Improvements

* optimize useElement by reducing reactive variables ([1b2d77a](https://github.com/ZeroOneJs/markdown-design/commit/1b2d77ab933f18c3f62d46c76721d40de1a408b4))
* reduce unnecessary rendering ([f318389](https://github.com/ZeroOneJs/markdown-design/commit/f318389e3cb6df46d4efac78997081c916a2c31f))

## [0.2.0](https://github.com/ZeroOneJs/markdown-design/compare/vue-markdown-design-v0.1.1...vue-markdown-design-v0.2.0) (2025-07-06)


### Features

* init ([7347813](https://github.com/ZeroOneJs/markdown-design/commit/73478138f5096d5ce89ef64c2e95471cad7d4244))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @markdown-design/markdown-it-headers bumped to 0.2.0
    * @markdown-design/markdown-it-sanitize bumped to 0.2.0
