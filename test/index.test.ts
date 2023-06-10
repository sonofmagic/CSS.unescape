import 'css.escape'
import { cssUnescape, CssUnescapeOptions } from '@/index'

function expectEqual(a: any, b: any, options?: CssUnescapeOptions) {
  expect(CSS.escape(a)).toBe(b)
  expect(cssUnescape(b, options)).toBe(a)
}

describe('[Default]', () => {
  it('common usage', () => {
    // expectEqual('\0', '\uFFFD')
    // expect(CSS.escape('\0')).toBe('\uFFFD')
    // expect(cssUnescape('�')).toBe('\0')

    expect(cssUnescape('\uFFFD')).toBe('\0')

    expectEqual('\0', '\uFFFD')

    // expect(cssUnescape(CSS.escape('\0'))).toBe('\0')
    // expect(CSS.escape('a\0')).toBe('a\uFFFD')
    expectEqual('a\0', 'a\uFFFD')
    // expect(CSS.escape('\0b')).toBe('\uFFFDb')
    expectEqual('\0b', '\uFFFDb')
    // expect(CSS.escape('a\0b')).toBe('a\uFFFDb')
    expectEqual('a\0b', 'a\uFFFDb')
  })

  it('self', () => {
    expect(
      cssUnescape('\0', {
        slashZero: false
      })
    ).toBe('\u0000')
    expect(
      cssUnescape('\uFFFD', {
        slashZero: false
      })
    ).toBe('�')
    // expectEqual('a\0b', 'a\uFFFDb')
    // expect(CSS.escape('\uFFFD')).toBe('\uFFFD')
    // expectEqual('\uFFFD', '\uFFFD')
    // expectEqual('\uFFFD', '�') // '\uFFFD')
    expectEqual('\uFFFD', '\uFFFD', {
      slashZero: false
    })
    // expect(CSS.escape('a\uFFFD')).toBe('a\uFFFD')
    expectEqual('a\uFFFD', 'a\uFFFD', {
      slashZero: false
    })
    // expect(CSS.escape('\uFFFDb')).toBe('\uFFFDb')
    expectEqual('\uFFFDb', '\uFFFDb', {
      slashZero: false
    })
    // expect(CSS.escape('a\uFFFDb')).toBe('a\uFFFDb')
    expectEqual('a\uFFFDb', 'a\uFFFDb', {
      slashZero: false
    })
  })

  it('type', () => {
    // @ts-ignore
    expect(CSS.escape(undefined)).toBe('undefined')
    // @ts-ignore
    expect(CSS.escape(true)).toBe('true')
    // @ts-ignore
    expect(CSS.escape(false)).toBe('false')
    // @ts-ignore
    expect(CSS.escape(null)).toBe('null')

    expect(CSS.escape('')).toBe('')
  })

  it('escape', () => {
    expect(CSS.escape('\u0001\u0002\u001E\u001F')).toBe('\\1 \\2 \\1e \\1f ')

    for (let i = 0; i < 10; i++) {
      const a0 = `${i}a`
      const b0 = `\\3${i} a`
      const x0 = `a${i}b`
      const y0 = `a${i}b`
      const f0 = `-${i}a`
      const g0 = `-\\3${i} a`
      // expect(CSS.escape(a0)).toBe(b0)
      // expect(cssUnescape(b0)).toBe(a0)
      // expect(CSS.escape(x0)).toBe(y0)
      // expect(cssUnescape(y0)).toBe(x0)
      // expect(CSS.escape(f0)).toBe(g0)
      // expect(cssUnescape(g0)).toBe(f0)
      expectEqual(a0, b0)
      expectEqual(x0, y0)
      expectEqual(f0, g0)
    }
  })

  it('single char', () => {
    // expect(CSS.escape('-')).toBe('\\-')
    // expect(CSS.escape('-a')).toBe('-a')
    // expect(CSS.escape('--')).toBe('--')
    // expect(CSS.escape('--a')).toBe('--a')
    expectEqual('-', '\\-')
    expectEqual('-a', '-a')
    expectEqual('--', '--')
    expectEqual('--a', '--a')
  })

  it('unicode', () => {
    // expect(CSS.escape('\u0080\u002D\u005F\u00A9')).toBe(
    //   '\u0080\u002D\u005F\u00A9'
    // )
    expectEqual('\u0080\u002D\u005F\u00A9', '\u0080\u002D\u005F\u00A9')
    // expect(
    //   CSS.escape(
    //     '\u007F\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F'
    //   )
    // ).toBe(
    //   '\\7f \u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F'
    // )
    expectEqual(
      '\u007F\u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F',
      '\\7f \u0080\u0081\u0082\u0083\u0084\u0085\u0086\u0087\u0088\u0089\u008A\u008B\u008C\u008D\u008E\u008F\u0090\u0091\u0092\u0093\u0094\u0095\u0096\u0097\u0098\u0099\u009A\u009B\u009C\u009D\u009E\u009F'
    )

    expectEqual('\u00A0\u00A1\u00A2', '\u00A0\u00A1\u00A2')
    // expect(CSS.escape('\u00A0\u00A1\u00A2')).toBe('\u00A0\u00A1\u00A2')
    expectEqual('a0123456789b', 'a0123456789b')
    // expect(CSS.escape('a0123456789b')).toBe('a0123456789b')

    expectEqual('abcdefghijklmnopqrstuvwxyz', 'abcdefghijklmnopqrstuvwxyz')
    // expect(CSS.escape('abcdefghijklmnopqrstuvwxyz')).toBe(
    //   'abcdefghijklmnopqrstuvwxyz'
    // )

    expectEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    // expect(CSS.escape('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe(
    //   'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    // )

    expectEqual('\u0020\u0021\u0078\u0079', '\\ \\!xy')
    // expect(CSS.escape('\u0020\u0021\u0078\u0079')).toBe('\\ \\!xy')

    // astral symbol (U+1D306 TETRAGRAM FOR CENTRE)
    expectEqual('\uD834\uDF06', '\uD834\uDF06')
    // expect(CSS.escape('\uD834\uDF06')).toBe('\uD834\uDF06')
    // lone surrogates
    expectEqual('\uDF06', '\uDF06')
    // expect(CSS.escape('\uDF06')).toBe('\uDF06')
    expectEqual('\uD834', '\uD834')
    // expect(CSS.escape('\uD834')).toBe('\uD834')
  })

  it('num start up class', () => {
    expectEqual('12345', '\\31 2345')
    expectEqual('2xlctext-base', '\\32 xlctext-base')
  })
})
