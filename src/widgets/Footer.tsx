import { useActionState } from 'react';
import { Link } from 'react-router';

import { SubmitButton } from '@/shared/ui/SubmitButton';

interface NewsletterState {
  ok: boolean;
  message: string;
}

async function newsletterAction(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim();
  if (!email.includes('@')) {
    return { ok: false, message: 'VALID EMAIL REQUIRED' };
  }

  await new Promise((resolve) => window.setTimeout(resolve, 350));
  return { ok: true, message: 'JOIN COMPLETE' };
}

const footerColumns = [
  ['HELP', '자주 묻는 질문', '1:1 문의', '반품·교환', '배송 조회'],
  ['SHOP', '베스트셀러', '신상품', '오늘의 딜', '기프트 카드'],
  ['COMPANY', '브랜드 스토리', '인재 채용', '파트너십', '공지사항'],
  ['SELL', '입점 신청', '판매자 센터', '광고 문의', '제휴 문의'],
] as const;

export function Footer() {
  const [state, formAction] = useActionState(newsletterAction, { ok: false, message: '' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo">
              VANITAS<span>.SHOP</span>
            </Link>
            <p>
              ▶ PRESS START TO SHOP.
              <br />
              오늘의 발견을 가장 빠르게.
              <br />
              큐레이션의 기준을 다시 쓰는 종합 쇼핑 플랫폼.
            </p>
            <form className="newsletter" action={formAction}>
              <input name="email" type="email" placeholder="EMAIL@VANITAS.SHOP" />
              <SubmitButton pendingLabel="...">JOIN</SubmitButton>
            </form>
            {state.message ? <p className="form-note">{state.message}</p> : null}
          </div>
          {footerColumns.map(([title, ...links]) => (
            <div className="footer-col" key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map((label) => (
                  <li key={label}>
                    <Link to="/">▸ {label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 VANITAS.SHOP — INSERT COIN TO CONTINUE</span>
          <div className="legal">
            <Link to="/">TERMS</Link>
            <Link to="/">PRIVACY</Link>
            <Link to="/">BUSINESS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
