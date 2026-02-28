import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @Post('/user/login') login(@Body() body: any) { return this.app.login(body.username, body.password) }
  @Post('/user/logout') logout() { return this.app.logout() }
  @Get('/user/getUserInfo') getUserInfo(@Headers('token') token: string) { return this.app.userInfo(token) }
  @Get('/user/getUserRoutes') getUserRoutes(@Headers('token') token: string) { return this.app.userRoutes(token) }

  @Get('/test/success') success() { return this.app.ok('哈哈哈') }
  @Get('/test/fail') fail() { return this.app.fail('请求出错了呦~', 400) }

  @Get('/cate/getCateTree') getCateTree() { return this.app.ok(this.app.getCates()) }
  @Get('/file/getFileList') getFileList(@Query('fileType') fileType: string) { return this.app.getFileList(fileType) }
  @Get('/area/getProvinceCityArea') getArea(@Query('type') type: string, @Query('code') code?: string) { return this.app.getProvinceCityArea(type, code) }

  @Get('/person/getList') personList(@Query('page') page: string, @Query('size') size: string) { return this.app.getPersons(Number(page || 1), Number(size || 10)) }
  @Get('/person/getDetail') personDetail(@Query('id') id: string) { return this.app.ok({ id }) }
  @Post('/person/add') personAdd(@Body() body: any) { return this.app.ok(body) }
  @Post('/person/update') personUpdate(@Body() body: any) { return this.app.ok(body) }
  @Post('/person/delete') personDelete() { return this.app.ok(true) }

  @Get('/system/user/getList') userList(@Query('page') page: string, @Query('size') size: string) { return this.app.getList(this.app.getUsers(), page, size) }
  @Get('/system/user/getDetail') userDetail(@Query('id') id: string) { return this.app.getById(this.app.getUsers(), id) }
  @Post('/system/user/add') userAdd(@Body() body: any) { return this.app.save(this.app.getUsers(), body) }
  @Post('/system/user/update') userUpdate(@Body() body: any) { return this.app.update(this.app.getUsers(), body) }
  @Post('/system/user/delete') userDelete(@Body('ids') ids: string[]) { return this.app.remove(this.app.getUsers(), ids || []) }

  @Get('/system/role/getList') roleList(@Query('page') page: string, @Query('size') size: string) { return this.app.getList(this.app.getRoles(), page, size) }
  @Get('/system/role/getDetail') roleDetail(@Query('id') id: string) { return this.app.getById(this.app.getRoles(), id) }
  @Post('/system/role/add') roleAdd(@Body() body: any) { return this.app.save(this.app.getRoles(), body) }
  @Post('/system/role/update') roleUpdate(@Body() body: any) { return this.app.update(this.app.getRoles(), body) }
  @Post('/system/role/delete') roleDelete(@Body('ids') ids: string[]) { return this.app.remove(this.app.getRoles(), ids || []) }
  @Get('/system/role/getRoleMenuIds') roleMenus(@Query('role') role: string) { return this.app.roleMenuIds(role) }

  @Get('/system/dept/getList') deptList() { return this.app.ok(this.app.getDepts()) }
  @Get('/system/dept/getDetail') deptDetail(@Query('id') id: string) { return this.app.getById(this.flatten(this.app.getDepts()), id) }
  @Post('/system/dept/add') deptAdd(@Body() body: any) { return this.app.ok(body) }
  @Post('/system/dept/update') deptUpdate(@Body() body: any) { return this.app.ok(body) }
  @Post('/system/dept/delete') deptDelete() { return this.app.ok(true) }

  @Get('/system/menu/getList') menuList() { return this.app.ok(this.app.getMenus()) }
  @Get('/system/menu/getDetail') menuDetail(@Query('id') id: string) { return this.app.getById(this.flatten(this.app.getMenus()), id) }
  @Post('/system/menu/add') menuAdd(@Body() body: any) { return this.app.ok(body) }
  @Post('/system/menu/update') menuUpdate(@Body() body: any) { return this.app.ok(body) }
  @Post('/system/menu/delete') menuDelete() { return this.app.ok(true) }
  @Get('/system/menu/getMenuOptions') menuOptions() { return this.app.menuOptions() }

  @Get('/system/dict/getList') dictList(@Query('page') page: string, @Query('size') size: string) { return this.app.getList(this.app.getDicts(), page, size) }
  @Get('/system/dict/getDetail') dictDetail(@Query('id') id: string) { return this.app.getById(this.app.getDicts(), id) }
  @Post('/system/dict/add') dictAdd(@Body() body: any) { return this.app.save(this.app.getDicts(), body) }
  @Post('/system/dict/update') dictUpdate(@Body() body: any) { return this.app.update(this.app.getDicts(), body) }
  @Post('/system/dict/delete') dictDelete(@Body('ids') ids: string[]) { return this.app.remove(this.app.getDicts(), ids || []) }
  @Get('/system/dict/getDictDataList') dictDataList(@Query('code') code: string) { return this.app.getDictDataList(code) }
  @Get('/system/dict/getDictDataDetail') dictDataDetail(@Query('code') code: string, @Query('id') id: string) { return this.app.getDictDataDetail(code, id) }
  @Get('/system/dict/getDictData') dictData() { return this.app.getDictData() }

  private flatten(list: any[]): any[] {
    return list.flatMap((item) => [item, ...(item.children ? this.flatten(item.children) : [])])
  }
}
