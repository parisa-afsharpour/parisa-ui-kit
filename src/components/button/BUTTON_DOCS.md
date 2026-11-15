# Button


## استفاده سریع

```tsx
import { Button } from "ui-kit-parisa";

export function SaveButton() {
  return (
    <Button
      label="ثبت اطلاعات"
      variant="solid"
      relevance="primary"
      size="m"
      onClick={() => console.log("clicked")}
    />
  );
}
```

اگر پروژه مصرف‌کننده هنوز `UIProvider` را در ریشه قرار نداده است، استفاده از Theme به این شکل خواهد بود:

```tsx
import { UIProvider, Button } from "ui-kit-parisa";

export function Example() {
  return (
    <UIProvider theme="samab" colorMode="light">
      <Button label="تأیید" variant="solid" relevance="primary" />
    </UIProvider>
  );
}
```

## ویژگی‌های ظاهری

### Variant

| مقدار | کاربرد |
| --- | --- |
| `solid` | دکمه با تأکید بصری بالا و پس‌زمینه پُر |
| `outline` | دکمه دارای حاشیه با تأکید کمتر |
| `tone` | دکمه با پس‌زمینه ملایم |
| `textual` | دکمه متنی با حداقل تأکید بصری |

```tsx
<Button label="Solid" variant="solid" relevance="primary" />
<Button label="Outline" variant="outline" relevance="primary" />
<Button label="Tone" variant="tone" relevance="primary" />
<Button label="Textual" variant="textual" relevance="primary" />
```

### Relevance

| مقدار | کاربرد |
| --- | --- |
| `base` | عملیات خنثی و عمومی |
| `primary` | اقدام اصلی و مهم صفحه |
| `danger` | عملیات حساس یا مخرب مانند حذف |

```tsx
<Button label="بازگشت" relevance="base" variant="outline" />
<Button label="ذخیره" relevance="primary" variant="solid" />
<Button label="حذف" relevance="danger" variant="solid" />
```

### Size

اندازه‌های پشتیبانی‌شده در Storybook عبارت‌اند از:

| مقدار | نام اندازه |
| --- | --- |
| `xs` | Extra Small |
| `s` | Small |
| `m` | Medium (مقدار پیش‌فرض Storybook) |
| `l` | Large |
| `xl` | Extra Large |

```tsx
<Button label="XS" size="xs" />
<Button label="S" size="s" />
<Button label="M" size="m" />
<Button label="L" size="l" />
<Button label="XL" size="xl" />
```

ابعاد، فاصله‌ها و تایپوگرافی هر اندازه از توکن‌های داخلی UI Kit تأمین می‌شود.

## جدول Props

| Prop | نوع / مقادیر | مقدار پیش‌فرض در Storybook | توضیح |
| --- | --- | --- | --- |
| `label` | `string` | `"متن دکمه"` | متن دکمه |
| `children` | `ReactNode` | — | محتوای داخل دکمه؛ در صورت نیاز جایگزین `label` |
| `variant` | `solid \| outline \| tone \| textual` | `solid` | سبک بصری |
| `relevance` | `base \| primary \| danger` | `primary` | نقش معنایی رنگ |
| `size` | `xs \| s \| m \| l \| xl` | `m` | اندازه دکمه |
| `disabled` | `boolean` | `false` | غیرفعال‌کردن دکمه |
| `loading` | `boolean` | `false` | نمایش وضعیت بارگذاری |
| `block` | `boolean` | `false` | اشغال عرض فضای در دسترس |
| `tooltip` | `string` | — | متن راهنمای دکمه |
| `startIcon` | `ReactNode` | — | آیکن ابتدای دکمه |
| `endIcon` | `ReactNode` | — | آیکن انتهای دکمه |
| `onClick` | React click handler | — | اجرای عملیات هنگام کلیک |
| `id` | `string` | — | شناسه عنصر HTML |
| `className` | `string` | — | کلاس CSS اضافی |
| `style` | `CSSProperties` | — | استایل اضافی؛ از بازنویسی توکن‌های طراحی پرهیز کنید |

> **توجه:** مقادیر پیش‌فرض این جدول از Story فعلی استخراج شده‌اند. برای جزئیات نهایی TypeScript، فایل `Button.types.ts` مرجع اصلی است.

## Stateها

حالت‌های تعاملی **Default، Hover، Pressed و Focus** توسط خود کامپوننت و CSS مدیریت می‌شوند؛ نیازی به ارسال Prop به نام `state` نیست.

برای حالت‌های غیرفعال یا بارگذاری از این Props استفاده کنید:

```tsx
<Button label="دکمه غیرفعال" disabled />
<Button label="در حال بارگذاری" loading />
```

هنگام بارگذاری یا غیرفعال‌بودن، نباید عملیات تکراری کاربر اجرا شود؛ رفتار دقیق را در تست‌های کامپوننت بررسی کنید.

## آیکن‌ها

```tsx
<Button
  label="افزودن"
  variant="solid"
  relevance="primary"
  startIcon={<span aria-hidden="true">＋</span>}
/>

<Button
  label="ادامه"
  variant="outline"
  relevance="base"
  endIcon={<span aria-hidden="true">←</span>}
/>
```

می‌توانید به‌جای `span`، کامپوننت آیکن دلخواه پروژه را به Props مربوطه ارسال کنید.

## Tooltip و عرض کامل

```tsx
<Button
  label="راهنما"
  variant="outline"
  relevance="base"
  tooltip="توضیحات مربوط به دکمه"
/>

<Button
  label="ثبت اطلاعات"
  variant="solid"
  relevance="primary"
  block
/>
```

## Theme و Light / Dark

Theme و Color Mode از طریق `UIProvider` انتخاب می‌شوند. توسعه‌دهنده نیازی ندارد برای تغییر رنگ، Button را بازنویسی کند.

```tsx
<UIProvider theme="samab" colorMode="light">
  <Button label="ثبت اطلاعات" relevance="primary" />
</UIProvider>
```

```tsx
<UIProvider theme="samab" colorMode="dark">
  <Button label="ثبت اطلاعات" relevance="primary" />
</UIProvider>
```

> نام Theme باید یکی از مقدارهای ثبت‌شده در `themeRegistry.ts` پروژه باشد.

## راهنمای استفاده

- برای عملیات اصلی صفحه از `relevance="primary"` استفاده کنید.
- برای عملیات خنثی از `base` و برای عملیات حساس از `danger` استفاده کنید.
- از یک الگوی ثابت برای `size` و `variant` در صفحات مشابه استفاده کنید.
- مقدار `loading` را هنگام ارسال درخواست تنظیم کنید و از ارسال چندباره جلوگیری کنید.
- رنگ‌های حالت‌های Hover، Pressed، Focus و Disabled را دستی تعیین نکنید؛ این حالت‌ها از Design System خوانده می‌شوند.
- برای دکمه‌های دارای آیکن بدون متن، نام قابل‌دسترسی مناسب را در نظر بگیرید.

## نمونه‌های موجود در Storybook

برای مشاهده رفتار واقعی کامپوننت از Storyهای **Playground، AllSizes، AllVariants، States، WithIcons، WithTooltip، FullWidth و VisualAudit** استفاده کنید.

در Toolbar می‌توان Theme محصول و حالت Light / Dark را تغییر داد و همان مثال‌ها را در وضعیت‌های مختلف بررسی کرد.
