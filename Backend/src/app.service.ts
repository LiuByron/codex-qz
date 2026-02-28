import { Injectable } from '@nestjs/common'

type ApiRes<T> = { code: number, data: T, message: string, success: boolean }

@Injectable()
export class AppService {
  private tokens = ['token_admin', 'token_user']

  private menus: any[] = [
    { id: '01', parentId: '', path: '/analyse', title: '分析页', icon: 'menu-analyse', type: 1, sort: 1, status: 1, roles: ['role_admin', 'role_user'], component: 'analyse/index', children: [], hidden: false, keepAlive: true, alwaysShow: false, breadcrumb: true, activeMenu: '', redirect: '', permission: '', showInTabs: true, affix: false },
    { id: '08', parentId: '', path: '/system', title: '系统管理', icon: 'menu-system', type: 1, sort: 8, status: 1, roles: ['role_admin'], component: 'Layout', children: [
      { id: '08101', parentId: '08', path: '/system/user', title: '用户管理', icon: '', type: 2, sort: 1, status: 1, roles: ['role_admin'], component: 'system/user/index', children: [], hidden: false, keepAlive: true, alwaysShow: false, breadcrumb: true, activeMenu: '', redirect: '', permission: '', showInTabs: true, affix: false },
      { id: '08102', parentId: '08', path: '/system/role', title: '角色管理', icon: '', type: 2, sort: 2, status: 1, roles: ['role_admin'], component: 'system/role/index', children: [], hidden: false, keepAlive: true, alwaysShow: false, breadcrumb: true, activeMenu: '', redirect: '', permission: '', showInTabs: true, affix: false }
    ], hidden: false, keepAlive: true, alwaysShow: false, breadcrumb: true, activeMenu: '', redirect: '', permission: '', showInTabs: true, affix: false }
  ]

  private users = [
    { id: 'u1', createUserString: '系统', createTime: '2024-01-01 10:00:00', disabled: false, deptId: 'd1', deptName: '研发部', username: 'admin', nickname: '管理员', gender: 1, avatar: 'https://i.pravatar.cc/100?img=1', email: 'admin@test.com', phone: '13800000000', status: 1, type: 1, description: '系统管理员', roleIds: ['role_admin'], roleNames: ['管理员'], permissions: ['*:*:*'] },
    { id: 'u2', createUserString: '系统', createTime: '2024-01-01 10:00:00', disabled: false, deptId: 'd2', deptName: '产品部', username: 'user', nickname: '普通用户', gender: 1, avatar: 'https://i.pravatar.cc/100?img=2', email: 'user@test.com', phone: '13900000000', status: 1, type: 2, description: '普通用户', roleIds: ['role_user'], roleNames: ['用户'], permissions: ['demo:view'] }
  ]

  private roles = [
    { id: 'r1', createUserString: '系统', createTime: '2024-01-01 10:00:00', disabled: false, name: '管理员', code: 'role_admin', sort: 1, status: 1, type: 1, description: '管理员' },
    { id: 'r2', createUserString: '系统', createTime: '2024-01-01 10:00:00', disabled: false, name: '普通用户', code: 'role_user', sort: 2, status: 1, type: 2, description: '普通用户' }
  ]

  private depts = [{ id: 'd1', name: '研发部', sort: 1, status: 1, createTime: '2024-01-01 10:00:00', parentId: '', description: '研发部门', children: [{ id: 'd2', name: '产品部', sort: 2, status: 1, createTime: '2024-01-01 10:00:00', parentId: 'd1', description: '产品部门' }] }]

  private dicts: any[] = [
    { id: 'dict1', createUserString: '系统', createTime: '2024-01-01 10:00:00', name: '状态', code: 'status', sort: 1, status: 1, description: '状态字典', list: [{ id: '1', name: '启用', value: 1, status: 1, color: 'green' }, { id: '0', name: '禁用', value: 0, status: 1, color: 'red' }] }
  ]

  private cates = [{ id: '1', name: '根目录', children: [{ id: '1-1', name: '子分类', children: [] }] }]
  private files = [
    { id: 'f1', name: '图片', extendName: 'png', src: 'https://i.pravatar.cc/300', updateTime: '2024-01-01 10:00:00', isDir: false, filePath: '/', size: 128 },
    { id: 'f2', name: '文档', extendName: 'txt', src: '', updateTime: '2024-01-01 10:00:00', isDir: false, filePath: '/', size: 56 },
    { id: 'f3', name: '音乐', extendName: 'mp3', src: '/static/audio/致你.mp3', updateTime: '2024-01-01 10:00:00', isDir: false, filePath: '/', size: 512 }
  ]

  private areas = [{ label: '北京市', code: '110000', children: [{ label: '北京市', code: '110100', children: [{ label: '东城区', code: '110101' }, { label: '西城区', code: '110102' }] }] }]

  ok<T>(data: T): ApiRes<T> { return { code: 200, data, message: '请求成功', success: true } }
  fail(message: string, code = 500): ApiRes<null> { return { code, data: null, message, success: false } }

  login(username: string, password: string) {
    if (!username) return this.fail('用户名不能为空', 50000)
    if (!password) return this.fail('密码不能为空', 50000)
    if (username === 'admin' && password === '123456') return this.ok({ token: 'token_admin' })
    if (username === 'user' && password === '123456') return this.ok({ token: 'token_user' })
    return this.fail('账号或者密码错误', 50000)
  }

  logout() { return this.ok(true) }

  userInfo(token: string) {
    if (!this.tokens.includes(token)) return this.fail('token失效', 401)
    const u = token === 'token_admin' ? this.users[0] : this.users[1]
    return this.ok({ id: u.id, nickname: u.nickname, avatar: u.avatar, roles: u.roleIds, permissions: u.permissions })
  }

  userRoutes(token: string) {
    if (!this.tokens.includes(token)) return this.fail('token失效', 401)
    if (token === 'token_admin') return this.ok(this.menus)
    return this.ok(this.menus.filter((m) => m.path !== '/system'))
  }

  menuOptions() {
    const map = (arr: any[]): any[] => arr.map((i) => ({ id: i.id, title: i.title, children: map(i.children || []) }))
    return this.ok(map(this.menus))
  }

  roleMenuIds(role: string) {
    if (role === 'role_user') return this.ok(['01'])
    return this.ok([])
  }

  getList(collection: any[], page = 1, size = 10) {
    const start = (Number(page) - 1) * Number(size)
    return this.ok({ total: collection.length, records: collection.slice(start, start + Number(size)) })
  }

  getById(collection: any[], id: string) {
    const item = collection.find((i) => i.id === id)
    if (!item) return this.fail('数据不存在', 400)
    return this.ok(item)
  }

  save(collection: any[], payload: any) {
    const item = { ...payload, id: payload.id ?? `${Date.now()}` }
    collection.push(item)
    return this.ok(item)
  }

  update(collection: any[], payload: any) {
    const idx = collection.findIndex((i) => i.id === payload.id)
    if (idx < 0) return this.fail('数据不存在', 400)
    collection[idx] = { ...collection[idx], ...payload }
    return this.ok(collection[idx])
  }

  remove(collection: any[], ids: string[]) {
    ids.forEach((id) => {
      const idx = collection.findIndex((i) => i.id === id)
      if (idx >= 0) collection.splice(idx, 1)
    })
    return this.ok(true)
  }

  getUsers() { return this.users }
  getRoles() { return this.roles }
  getDepts() { return this.depts }
  getMenus() { return this.menus }
  getDicts() { return this.dicts }
  getCates() { return this.cates }
  getFiles() { return this.files }
  getAreas() { return this.areas }

  getPersons(page = 1, size = 10) {
    const list = Array.from({ length: Number(size) }).map((_, idx) => ({
      id: `p-${page}-${idx}`,
      name: `用户${idx + 1}`,
      account: `user${idx + 1}`,
      phone: '15578728810',
      gender: 1,
      email: 'demo@test.com',
      createTime: '2024-01-01 10:00:00',
      address: '北京市朝阳区',
      avatar: 'https://i.pravatar.cc/120',
      proportion: 50,
      status: 1,
      hobbys: ['音乐', '电影']
    }))
    return this.ok({ total: 1000, records: list })
  }

  getDictDataList(code: string) {
    const d = this.dicts.find((i) => i.code === code)
    return this.ok({ total: d?.list?.length || 0, records: d?.list || [] })
  }

  getDictDataDetail(code: string, id: string) {
    const d = this.dicts.find((i) => i.code === code)
    const item = d?.list?.find((i: any) => i.id === id)
    if (!item) return this.fail('无法查找数据！', 403)
    return this.ok(item)
  }

  getDictData() {
    const obj: Record<string, any[]> = {}
    this.dicts.forEach((i) => {
      obj[i.code] = i.list.map((x: any) => ({ label: x.name, value: x.value, tagProps: x.color ? { color: x.color } : undefined }))
    })
    return this.ok(obj)
  }

  getFileList(fileType: string | number) {
    const map: Record<string, string[]> = { '1': ['jpg', 'png', 'jpeg', 'gif'], '2': ['txt', 'doc', 'xls'], '3': ['mp4'], '4': ['mp3'], '5': ['zip', 'rar', 'ppt', 'css', 'js', 'html'] }
    const key = String(fileType)
    const list = key === '0' ? this.files : this.files.filter((i) => (map[key] || []).includes(i.extendName))
    return this.ok({ total: list.length, records: list })
  }

  getProvinceCityArea(type: string, code?: string) {
    if (type === 'province') return this.ok(this.areas.map((i) => ({ label: i.label, code: i.code })))
    if (!code) return this.ok([])
    const find = (arr: any[]): any => {
      for (const item of arr) {
        if (item.code === code) return item
        const child = item.children ? find(item.children) : undefined
        if (child) return child
      }
    }
    const parent = find(this.areas)
    return this.ok((parent?.children || []).map((i: any) => ({ label: i.label, code: i.code })))
  }
}
