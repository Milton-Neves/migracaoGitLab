import { DashOnNullPipe } from './dash-on-null.pipe'

describe('DashOnNullPipe', () => {
  it('create an instance', () => {
    const pipe = new DashOnNullPipe()
    expect(pipe).toBeTruthy()
  })
})
