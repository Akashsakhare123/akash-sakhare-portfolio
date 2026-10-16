import {test,expect} from '@playwright/test';

test('cursor follows pointer, hides on links, docks on social icons and recovers',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});
 // This scenario deliberately has no WebGL: cursor behavior is independent of 3D.
 await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]){return type.startsWith('webgl')?null:get.call(this,type,...args);}as typeof get;});
 await page.goto('/');const cursor=page.locator('.cursor-main');await expect(cursor).toHaveClass(/cursor-active/);await page.mouse.move(300,280);await expect.poll(()=>cursor.evaluate(e=>Math.abs(e.getBoundingClientRect().x+25-300))).toBeLessThan(3);
 await page.getByRole('link',{name:/Akash Sakhare home/}).hover();await expect(cursor).toHaveClass(/cursor-disable/);await page.mouse.move(400,300);await expect(cursor).not.toHaveClass(/cursor-disable/);
 await page.locator('.social-icons').hover();await expect(cursor).toHaveClass(/cursor-icons/);await page.mouse.move(500,300);await expect(cursor).not.toHaveClass(/cursor-icons/);
 for(const link of await page.locator('.social-icons a').all()){
  const before=await link.boundingBox();expect(before).not.toBeNull();expect(before!.width).toBeCloseTo(50,1);expect(before!.height).toBeCloseTo(50,1);
  const slot=await link.locator('..').boundingBox();expect(before!.x).toBeCloseTo(slot!.x,1);expect(before!.y).toBeCloseTo(slot!.y,1);
  await link.hover({position:{x:42,y:10}});await expect(cursor).toHaveClass(/cursor-icons/);const after=await link.boundingBox();expect(after!.x).toBeCloseTo(before!.x,1);expect(after!.y).toBeCloseTo(before!.y,1);
 }
 await page.mouse.move(500,300);await expect(cursor).not.toHaveClass(/cursor-icons/);
 await page.emulateMedia({reducedMotion:'reduce'});await expect(cursor).toBeHidden();await page.emulateMedia({reducedMotion:'no-preference'});await expect(cursor).toBeVisible();
});

test('a slow hero load shows content then recovers the real interactive scene',async({page},info)=>{
 test.skip(info.project.name!=='chrome','Real 3D exercised in Chrome.');test.setTimeout(120000);
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});
 let release:()=>void=()=>{};const gate=new Promise<void>(resolve=>release=resolve);let requested:()=>void=()=>{};const requestStarted=new Promise<void>(resolve=>requested=resolve);
 await page.route('**/models/character.glb',async route=>{requested();await gate;await route.continue();});
 try {await page.goto('/');await requestStarted;await expect(page.locator('.loading-screen')).toHaveCount(0,{timeout:25000});await expect(page.locator('body')).toHaveClass(/static-experience/);await expect(page.locator('.cursor-main')).toBeVisible();
 } finally {release();}
 await expect(page.locator('main')).toHaveClass(/main-active/);await expect(page.locator('body')).toHaveClass(/character-ready/,{timeout:45000});await expect(page.locator('body')).not.toHaveClass(/static-experience/);await expect(page.locator('canvas')).toBeVisible();
 await page.mouse.move(180,260);await page.waitForTimeout(3500);await page.screenshot({path:'docs/reference-parity/hero-looking-left.png'});await page.mouse.move(1280,600);await page.waitForTimeout(1000);await page.screenshot({path:'docs/reference-parity/hero-looking-right.png'});
});
