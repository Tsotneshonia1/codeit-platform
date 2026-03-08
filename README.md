# 🚀 DevGrade

> პლატფორმა, რომელიც ამარტივებს სტუდენტური დავალებების გაგზავნისა და ლექტორების მიერ კოდის შეფასების პროცესს.

![DevGrade Preview](https://via.placeholder.com/1200x600?text=ატვირთე+შენი+საიტის+სურათი+რეპოში+და+აქ+მიუთითე+ლინკი)

🔗 **Live Demo:** [DevGrade Platform](https://codeit-platform-3cj1.vercel.app/)

## 📖 პროექტის შესახებ

**DevGrade** შეიქმნა იმისთვის, რომ კოდის შეფასების პროცესი იყოს ბევრად მარტივი, გამჭვირვალე და ცენტრალიზებული. პლატფორმა საშუალებას აძლევს სტუდენტებს, სწრაფად გაგზავნონ თავიანთი GitHub რეპოზიტორიები, ხოლო ლექტორებს უმარტივებს ნამუშევრების მართვას, სტატუსების შეცვლასა და უკუკავშირის (Feedback) დატოვებას რეალურ დროში.

## ✨ ძირითადი ფუნქციონალი

* **👤 ავტორიზაცია და უსაფრთხოება:** ინტეგრირებული Clerk ავტორიზაცია (Google & Email/Password).
* **🎓 სტუდენტის პანელი:** დავალებების (GitHub ლინკების) გაგზავნის მარტივი ინტერფეისი.
* **👨‍🏫 ლექტორის (ადმინ) პანელი:** გაგზავნილი დავალებების სრული სია რეალურ დროში.
* **📝 შეფასების სისტემა:** სტატუსების მართვა (Pending, Reviewed, Rejected) და ფიდბექის დაწერა.
* **📱 Responsive დიზაინი:** იდეალურად მუშაობს როგორც კომპიუტერზე, ისე მობილურ მოწყობილობებზე.

## 🛠 ტექნოლოგიები (Tech Stack)

პროექტი აწყობილია თანამედროვე ვებ-ტექნოლოგიების გამოყენებით:

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon DB](https://neon.tech/))
* **ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** [Clerk](https://clerk.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)

## ⚙️ ლოკალურად გაშვება (Getting Started)

თუ გსურთ პროექტის ლოკალურად გაშვება, მიყევით ქვემოთ მოცემულ ნაბიჯებს:

### 1. რეპოზიტორიის კლონირება
```bash
git clone [https://github.com/Tsotneshonia1/codeit-platform.git](https://github.com/Tsotneshonia1/codeit-platform.git)
cd codeit-platform