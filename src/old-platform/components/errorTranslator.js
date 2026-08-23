import get from 'lodash.get';

export const translate = (error) => {

	let e = null;
	if (typeof error === 'object') {

        if (error.status && error.status === 401) {
            return 'خطای انقضای لاگین';
        }
		if (error.status && error.status === 400) {
	            return 'درخواست نامعتبر';
	        }

        if (error.status && error.status === 403) {
            return 'خطای دسترسی غیرمجاز';
        }

		if (error.status && error.status === 500) {
	            return 'خطای داخلی';
	        }

		//DataFetchingError
		e = get(error, 'source.errors[0].message');
	}else if (typeof error === 'string') {
		e = error;
	}

	if (e) {
		if (e && e.startsWith('INF-00001')) {
			return 'عملیات با موفقیت انجام شد.';
		}
		if (e && e.startsWith('INF-00020')) {
			return 'پیامک با موفقیت ارسال شد';
		}

		if (e.startsWith('ERR-00001')) {
			return 'نام کاربری یا رمز عبور اشتباه است.';
		}

		if (e.startsWith('ERR-00002')) {
			return 'حساب کاربری شما غیر فعال است.';
		}

		if (e.startsWith('ERR-00003')) {
			return 'خطای ورود ناموفق';
		}

		if (e.startsWith('ERR-00010')) {
		  return 'عملیات امکان پذیر نمی باشد.';
		}

		if (e && e.startsWith('ERR-00011')) {
		  return 'نام کاربری موجود است.';
		}

		if (e.startsWith('ERR-00015')) {
			return 'حذف کاربر دارای فعالیت امکان پذیر نمی باشد.';
		}

		if (e.startsWith('ERR-00016')) {
			return 'حذف کاربر admin امکان پذیر نمی باشد.';
		}

		if (e && e.startsWith('ERR-00017')) {
		  return 'نام موجود است.';
		}

		if (e && e.startsWith('ERR-00018')) {
		  return 'نام موجود است.';
		}

		if (e && e.startsWith('ERR-00019')) {
		  return 'غیرفعال کردن کاربر admin امکان پذیر نمی باشد.';
		}

		if (e && e.startsWith('ERR-00020')) {
			return 'حساب کاربری شما منقضی شده است';
		}

		if (e && e.startsWith('ERR-00021')) {
			return 'حساب کاربری شما قفل شده است';
		}

		if (e && e.startsWith('ERR-00022')) {
			return 'رمز عبور منقضی شده است';
		}

		if (e && e.startsWith('ERR-00023')) {
			return 'تغییر رمز عبور الزامی است';
		}

		if (e && e.startsWith('ERR-00024')) {
			return 'بازه زمانی تغییر رمز متقضی شده است';
		}

		if (e && e.startsWith('ERR-00025')) {
			return 'حذف رل admin امکان پذیر نمی باشد.';
		}
		if (e && e.startsWith('ERR-00026')) {
			return 'هیچ رکوردی یافت نشد.';
		}
		if (e && e.startsWith('ERR-00027')) {
			return 'شما دسترسی به این زیر سیستم را ندارید.';
		}

		if (e && e.startsWith('ERR-00028')) {
			return 'حداقل یکی از پارامترهای شماره حساب،کد ملی، شماره مشتری و یا کد کاربر را وارد کنید.';
		}
		if (e && e.startsWith('ERR-00029')) {
			return 'لطفا شماره کارت را وارد نمایید.';
		}
		if (e && e.startsWith('ERR-00030')) {
					return 'شماره کارت وارد شده صحیح نمیباشد.';
				}
		if (e && e.startsWith('ERR-00031')) {
							return 'یک بازه تاریخی حداکثر 6 ماهه انتخاب کنید.';
						}

		if (e && e.startsWith('ERR-00050')) {
			return 'شما نمی توانید حساب کاربری خود را حذف کنید.';
		}

		if (e && e.startsWith('ERR-00051')) {
			return 'تغییر نام رل ادمین امکان پذیر نیست.';
		}


		if (e && e.startsWith('ERR-00058')) {
			return 'خطای سرور';
		}
		if (e && e.startsWith('ERR-00032')) {
									return 'لطفا یک بازه تاریخی انتخاب کنید.';
								}
		if (e && e.startsWith('ERR-00033')) {
			return 'شما به هیچ سرفصلی دسترسی ندارید!';
		}
		if (e && e.startsWith('ERR-00034')) {
			return 'شما به هیچ شعبه ای دسترسی ندارید!';
		}
		if (e && e.startsWith('ERR-00059')) {
			return 'لطفا حداقل سه کاراکتر وارد نمایید';
		}
		if (e && e.startsWith('ERR-00060')) {
			return 'حذف تاریخ امکان پذیر نمیباشد';
		}
		if (e && e.startsWith('ERR-00061')) {
			return 'بازه تاریخ انتخاب شده نباید بیش از 1 ماه باشد.';
		}
		if (e && e.startsWith('ERR-00062')) {
			return 'ُساعات پایان نمیتواند کوچکتر از ساعت شروع باشد';
		}
		if (e && e.startsWith('ERR-00063')) {
			return 'تاریخ پایان نمیتواند کوچکتر از تاریخ شروع باشد';
		}
	}

	return 'خطای نامشخص';
}

