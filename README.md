# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Deployment

cd downloads
chmod 400 "DevTinder-Secret.pem"
ssh -i "DevTinder-Secret.pem" ubuntu@ec2-54-167-248-253.compute-1.amazonaws.com
cd DevTinder-Frontend/
sudo systemctl start nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo scp -r dist/\* /var/www/html/
Enbale port : 80 of your instagram