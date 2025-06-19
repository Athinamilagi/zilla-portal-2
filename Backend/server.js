const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { setupLogger } = require('./utils/logger');
const profileRoutes = require('./routes/profile.routes');
const loginRoutes = require('./routes/login.routes');
const rfqRoutes = require('./routes/rfq.routes');
const poRoutes = require('./routes/po.routes');
const goodsRoutes = require('./routes/goods.routes');
const agingRoutes = require('./routes/aging.routes');
const invoiceFrontRoutes = require('./routes/invoicefront.routes');
const invoiceBackRoutes = require('./routes/invoiceback.routes');
const creditRoutes = require('./routes/credit.routes');
const pdfRoutes = require('./routes/pdf.routes')

const app = express();
const logger = setupLogger();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/rfq', rfqRoutes);
app.use('/api/po', poRoutes);
app.use('/api/goods', goodsRoutes);
app.use('/api/aging', agingRoutes);
app.use('/api/invoicefront', invoiceFrontRoutes);
app.use('/api/invoiceback', invoiceBackRoutes);
app.use('/api/credit', creditRoutes);
app.use('/api/pdf', pdfRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Global error handler: ${err.message}`);
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});