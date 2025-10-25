import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";

const styles = {
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  header: { marginBottom: 20 },
  invoiceTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 12, color: "#555" },

  table: { width: "100%", borderTop: 1, borderBottom: 1, marginBottom: 20 },
  tableRow: { flexDirection: "row", borderBottom: 1, borderColor: "#ddd", paddingVertical: 5 },
  tableCol: { flex: 1, textAlign: "center" },
  tableHeader: { fontWeight: "bold", backgroundColor: "#f2f2f2", padding: 3 },

  summary: { marginTop: 20, paddingTop: 10, borderTop: 1, borderColor: "#ddd" },
  summaryText: { fontSize: 12, marginBottom: 3 },
  total: { fontSize: 14, fontWeight: "bold", marginTop: 5 },
};


const InvoicePDF = ({ orderData }) => (
  <Document>
<Page size="A4" style={styles.page}>
  {/* Header */}
  <View style={styles.header}>
    <Text style={styles.invoiceTitle}>INVOICE</Text>
    <Text style={styles.info}>Order ID: {orderData?._id}</Text>
    <Text style={styles.info}>
      Date: {new Date(orderData?.createdAt).toLocaleString()}
    </Text>
  </View>

  {/* Items Table */}
  <View style={styles.table}>
    {/* Table Header */}
    <View style={styles.tableRow}>
      <Text style={[styles.tableCol, styles.tableHeader]}>Item</Text>
      <Text style={[styles.tableCol, styles.tableHeader]}>Price</Text>
      <Text style={[styles.tableCol, styles.tableHeader]}>Qty</Text>
      <Text style={[styles.tableCol, styles.tableHeader]}>Total</Text>
    </View>

    {/* Table Rows */}
    {orderData?.item.map((item, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCol}>{item.title}</Text>
        <Text style={styles.tableCol}>{item.price} $</Text>
        <Text style={styles.tableCol}>{item.quantity}</Text>
        <Text style={styles.tableCol}>{item.price * item.quantity} $</Text>
      </View>
    ))}
  </View>

  {/* Summary */}
  <View style={styles.summary}>
    <Text style={styles.summaryText}>Subtotal: {orderData?.subTotal} $</Text>
    <Text style={styles.summaryText}>Discount: {orderData?.totalDiscount} $</Text>
    <Text style={styles.summaryText}>Shipping: {orderData?.shippingCost} $</Text>
    <Text style={styles.total}>Total: {orderData?.totalAmount} $</Text>
  </View>
</Page>

  </Document>
);

export default InvoicePDF;
