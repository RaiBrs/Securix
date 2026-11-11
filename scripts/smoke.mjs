import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = process.argv[2] || 'http://127.0.0.1:5173/'
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const screenshotDir = path.join(process.cwd(), '.qa')
await mkdir(screenshotDir, { recursive: true })

const browser = await chromium.launch({ executablePath: chromePath, headless: true })
const errors = []

try {
  for (const viewport of [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 390, height: 844, name: 'mobile' },
    { width: 320, height: 700, name: 'small-mobile' },
  ]) {
    const page = await browser.newPage({ viewport })
    page.on('pageerror', (error) => errors.push(`${viewport.name}: ${error.message}`))
    await page.goto(baseUrl, { waitUntil: 'networkidle' })

    assert.equal(await page.locator('html').getAttribute('lang'), 'pt-PT')
    assert.equal(await page.locator('main > section').count(), 6)
    assert.equal(await page.getByRole('heading', { level: 1 }).count(), 1)
    assert.equal(await page.getByRole('heading', { level: 1 }).innerText(), 'Securix®')
    assert.equal(await page.getByText('Arraste para rodar').count(), 0)
    assert.equal(await page.getByText('Deslize para explorar').count(), 0)
    assert.equal(await page.getByText('Voltar ao início').count(), 0)
    assert.equal(await page.locator('.site-footer__github').getAttribute('href'), 'https://github.com/RaiBrs')
    assert.equal(await page.locator('.site-footer__brand').innerText(), 'Securix®')
    assert.equal(await page.locator('.site-footer p').innerText(), 'Projeto conceitual de front-end. Empresa fictícia.')
    if (await page.locator('.lock-experience').count()) {
      const pointerEvents = await page.locator('.lock-experience').evaluate((node) => getComputedStyle(node).pointerEvents)
      assert.equal(pointerEvents, 'auto')
      assert.equal(await page.locator('.lock-experience').getAttribute('tabindex'), '0')
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
    assert.ok(overflow <= 1, `${viewport.name}: overflow horizontal de ${overflow}px`)

    if (viewport.width <= 1050) {
      assert.equal(await page.locator('.site-nav').isVisible(), false, `${viewport.name}: atalhos do header aparecem no mobile`)
      assert.equal(await page.locator('.brand').isVisible(), true)
    } else {
      assert.equal(await page.locator('.site-nav').isVisible(), true)
    }

    if (viewport.name === 'desktop') {
      await page.screenshot({ path: path.join(screenshotDir, 'desktop-hero.png') })
      const lock = page.locator('.lock-experience canvas')
      await lock.waitFor()
      assert.equal(await lock.count(), 1)
      const frameA = await lock.screenshot()
      await page.waitForTimeout(1200)
      const frameB = await lock.screenshot()
      assert.ok(!frameA.equals(frameB), 'desktop: cadeado 3D permanece imóvel')
      await lock.screenshot({ path: path.join(screenshotDir, 'desktop-lock-before-drag.png') })
      const lockArea = page.locator('.lock-experience')
      const bounds = await lockArea.boundingBox()
      assert.ok(bounds)
      await lockArea.evaluate((node) => node.addEventListener('gotpointercapture', (event) => {
        node.dataset.capturedPointer = String(event.pointerId)
      }, { once: true }))
      await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
      await page.mouse.down()
      await page.mouse.move(bounds.x + bounds.width / 2 + 170, bounds.y + bounds.height / 2 + 100, { steps: 8 })
      assert.ok(await lockArea.getAttribute('data-captured-pointer'), 'desktop: o arrasto não capturou o ponteiro')
      assert.equal(await lockArea.evaluate((node) => getComputedStyle(node).cursor), 'grabbing')
      await page.waitForTimeout(200)
      await lock.screenshot({ path: path.join(screenshotDir, 'desktop-lock-after-drag.png') })
      await page.mouse.up()
      await lockArea.focus()
      const scrollBeforeKey = await page.evaluate(() => scrollY)
      await page.keyboard.press('ArrowDown')
      assert.equal(await page.evaluate(() => scrollY), scrollBeforeKey, 'desktop: seta do teclado rolou a página em vez de girar o cadeado')
      await page.mouse.wheel(0, 450)
      await page.waitForTimeout(550)
      assert.equal(await page.locator('html').evaluate((node) => node.classList.contains('header-hidden')), true, 'desktop: header não saiu ao rolar para baixo')
      assert.ok(await page.locator('.site-header').evaluate((node) => node.getBoundingClientRect().bottom) <= 1, 'desktop: header continua visível após a descida')
      await page.screenshot({ path: path.join(screenshotDir, 'desktop-header-hidden.png') })
      await page.mouse.wheel(0, -100)
      await page.waitForTimeout(550)
      assert.equal(await page.locator('html').evaluate((node) => node.classList.contains('header-hidden')), false, 'desktop: header não voltou ao rolar para cima')
      assert.ok(await page.locator('.site-header').evaluate((node) => node.getBoundingClientRect().top) >= -1, 'desktop: header não voltou ao topo')
    }
    if (viewport.name === 'mobile') {
      await page.screenshot({ path: path.join(screenshotDir, 'mobile-hero.png') })
    }

    await page.getByRole('button', { name: /Inteligência/ }).click()
    assert.match(await page.locator('.architecture__detail h3').innerText(), /Contexto antes da resposta/)

    if (viewport.width > 1050) {
      await page.mouse.wheel(0, -100)
      await page.waitForTimeout(550)
      await page.locator('.site-nav__link[href="#especialidades"]').click()
    } else {
      await page.locator('#especialidades').evaluate((node) => node.scrollIntoView({ block: 'start', behavior: 'instant' }))
    }
    await page.waitForTimeout(1000)
    if (viewport.width > 1050) {
      assert.equal(await page.locator('.site-nav__link[href="#especialidades"]').getAttribute('aria-current'), 'location')
    }
    const positions = await page.evaluate(() => ({
      headerBottom: document.querySelector('.site-header').getBoundingClientRect().bottom,
      titleTop: document.getElementById('expertise-title').getBoundingClientRect().top,
    }))
    assert.ok(positions.titleTop >= Math.max(0, positions.headerBottom) - 2, `${viewport.name}: título das especialidades encoberto pelo Header`)
    await page.mouse.wheel(0, Math.max(500, viewport.height * .65))
    await page.waitForTimeout(500)
    const titleAfterScroll = await page.locator('#expertise-title').evaluate((node) => node.getBoundingClientRect().top)
    assert.ok(titleAfterScroll < positions.titleTop - 40, `${viewport.name}: título permanece fixo enquanto a página rola`)
    await page.locator('#especialidade-04').scrollIntoViewIfNeeded()
    const sectorsBefore = await page.locator('#setores').evaluate((node) => node.getBoundingClientRect().top)
    await page.mouse.wheel(0, viewport.height)
    await page.waitForTimeout(500)
    const sectorsAfter = await page.locator('#setores').evaluate((node) => node.getBoundingClientRect().top)
    assert.ok(sectorsAfter < sectorsBefore - 40, `${viewport.name}: a página não avança para Setores após a última especialidade`)

    if (viewport.name === 'desktop') {
      await page.locator('#especialidade-01').screenshot({ path: path.join(screenshotDir, 'desktop-especialidade.png') })
      await page.locator('#especialidade-01 .expertise__visual').hover()
      await page.waitForTimeout(950)
      const symbolScale = await page.locator('#especialidade-01 .expertise-symbol').evaluate((node) => new DOMMatrixReadOnly(getComputedStyle(node).transform).a)
      assert.ok(symbolScale > 1.05, `desktop: símbolo não amplia no hover (${symbolScale})`)
      await page.locator('#arquitetura').scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      await page.screenshot({ path: path.join(screenshotDir, 'desktop-arquitetura.png') })
      await page.locator('#setores').scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      await page.screenshot({ path: path.join(screenshotDir, 'desktop-setores.png') })
      await page.locator('.site-footer').screenshot({ path: path.join(screenshotDir, 'desktop-footer.png') })
    }
    if (viewport.name === 'mobile') {
      await page.locator('#especialidades').scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      assert.ok(await page.locator('.site-header').evaluate((node) => node.getBoundingClientRect().top) >= -1, 'mobile: marca desapareceu durante a rolagem')
      await page.screenshot({ path: path.join(screenshotDir, 'mobile-especialidades.png') })
    }

    console.log(`${viewport.name}: 6 secções, interação e largura verificadas; canvas=${await page.locator('canvas').count()}`)
    await page.close()
  }

  const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } })
  reduced.on('pageerror', (error) => errors.push(`reduced-motion: ${error.message}`))
  await reduced.goto(baseUrl, { waitUntil: 'networkidle' })
  assert.equal(await reduced.locator('canvas').count(), 0)
  assert.equal(await reduced.locator('main > section').count(), 6)
  await reduced.close()

  const touch = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true })
  touch.on('pageerror', (error) => errors.push(`touch: ${error.message}`))
  await touch.goto(baseUrl, { waitUntil: 'networkidle' })
  assert.equal(await touch.locator('.lock-experience').evaluate((node) => getComputedStyle(node).touchAction), 'pan-y pinch-zoom')
  await touch.close()

  assert.deepEqual(errors, [])
  console.log('movimento reduzido e ausência de erros de execução verificados')
} finally {
  await browser.close()
}
