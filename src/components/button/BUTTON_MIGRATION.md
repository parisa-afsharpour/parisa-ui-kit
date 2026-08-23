# UI Kit – Button Component (Migration & Usage Guide)

این Button جایگزین **کامپوننت قدیمی FlatButton / Button قدیمی** شده و از Ant Design 6 استفاده می‌کند.

ویژگی‌ها:

- ساده و type-safe
- variant واحد و semantic (`default | primary | secondary | danger | ghost | link`)
- پشتیبانی از `loading`, `block`, `disabled`, `icon`, `tooltip`
- آماده theme و extension در آینده

---

## Props

| Prop         | Type                      | Default     | توضیح                                                                 |
|-------------|---------------------------|------------|----------------------------------------------------------------------|
| `variant`    | `'default' \| 'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'link'` | `'default'` | سبک دکمه |
| `size`       | `'small' \| 'middle' \| 'large'` | `'middle'` | اندازه دکمه |
| `loading`    | `boolean`                 | `false`     | نشان دادن اسپینر و غیرفعال کردن دکمه |
| `block`      | `boolean`                 | `false`     | دکمه full-width می‌شود |
| `disabled`   | `boolean`                 | `false`     | غیرفعال کردن دکمه |
| `icon`       | `ReactNode`               | —          | اضافه کردن آیکون Ant یا custom ReactNode |
| `tooltip`    | `string`                  | —          | نمایش tooltip هنگام hover |
| `onClick`    | `() => void`              | —          | Callback هنگام کلیک |
| `id`         | `string`                  | —          | شناسه HTML دکمه |
| `label`      | `string`                  | —          | متن دکمه |
| `children`   | `ReactNode`               | —          | محتوای داخلی دکمه |

---

## نمونه‌های استفاده

### ساده

```tsx
<Button label="Default" />
<Button label="Save" variant="primary" />
<Button label="Cancel" variant="secondary" />
