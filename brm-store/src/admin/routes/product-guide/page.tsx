import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Text, Badge, Button } from "@medusajs/ui";
import { useState } from "react";
import {
  AcademicCap,
  CheckCircleSolid,
  ArrowRight,
  CogSixTooth,
  ShoppingCart,
  Tag,
  ExclamationCircle,
  InformationCircle,
  LightBulb,
} from "@medusajs/icons";

/**
 * Product Management Guide for BRM Yamaha Parts
 * Step-by-step workflow untuk admin
 */
const ProductGuidePage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const workflowSteps = [
    {
      id: "categories",
      title: "Step 1: Setup Categories & Collections",
      icon: "🏗️",
      description:
        "Setup struktur kategori dan koleksi yang sesuai dengan fitur produk BRM",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories Structure */}
            <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-ui-bg-subtle rounded-lg flex items-center justify-center">
                  <Text className="text-sm">📁</Text>
                </div>
                <Heading level="h3">Product Categories</Heading>
              </div>
              <div className="space-y-3">
                <div className="border-l-2 border-ui-border-interactive pl-4 space-y-1">
                  <Text className="font-medium">🏍️ BRM Yamaha Parts</Text>
                  <div className="ml-4 space-y-1 text-sm text-ui-fg-muted">
                    <div>📦 Engine Parts (Piston, CDI, Carburetor)</div>
                    <div>🛡️ Body Parts (Fairing, Windshield, Tank)</div>
                    <div>🔧 Brake System (Pad, Disc, Fluid)</div>
                    <div>⚡ Electrical (CDI, Coil, Wiring)</div>
                    <div>🎨 Accessories (Top Case, Windshield)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collections */}
            <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-ui-bg-subtle rounded-lg flex items-center justify-center">
                  <Text className="text-sm">📚</Text>
                </div>
                <Heading level="h3">Collections (by Model)</Heading>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Badge color="blue" className="justify-center">
                  NMAX Parts
                </Badge>
                <Badge color="green" className="justify-center">
                  Aerox Parts
                </Badge>
                <Badge color="orange" className="justify-center">
                  R15 Parts
                </Badge>
                <Badge color="purple" className="justify-center">
                  XMAX Parts
                </Badge>
                <Badge color="red" className="justify-center">
                  Vixion Parts
                </Badge>
                <Badge color="grey" className="justify-center">
                  Universal Parts
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <div className="flex gap-3">
              <InformationCircle className="w-5 h-5 text-ui-fg-interactive flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-ui-fg-base mb-1">
                  Langkah-langkah setup:
                </Text>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>
                    1. Buka <strong>Settings → Product Categories</strong>
                  </div>
                  <div>
                    2. Create category "BRM Yamaha Parts" sebagai parent
                  </div>
                  <div>
                    3. Tambahkan sub-categories: Engine Parts, Body Parts, dll
                  </div>
                  <div>
                    4. Buka <strong>Products → Collections</strong>
                  </div>
                  <div>5. Create collections berdasarkan model motor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "product-creation",
      title: "Step 2: Create Product",
      icon: "📦",
      description: "Membuat produk dengan informasi lengkap dan SEO-friendly",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Good Example */}
            <div className="p-6 border border-ui-border-strong bg-ui-bg-base rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircleSolid className="w-5 h-5 text-ui-fg-interactive" />
                <Heading level="h3" className="text-ui-fg-base">
                  ✅ Contoh yang Benar
                </Heading>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <Text className="font-medium">Title:</Text>
                  <div className="bg-ui-bg-subtle p-2 rounded border border-ui-border-base mt-1">
                    "Top Case Matt Black 45L - XMAX 250 Connected"
                  </div>
                </div>
                <div>
                  <Text className="font-medium">Handle:</Text>
                  <div className="bg-ui-bg-subtle p-2 rounded border border-ui-border-base mt-1 font-mono text-xs">
                    top-case-matt-black-45l-xmax-250-connected
                  </div>
                </div>
                <div>
                  <Text className="font-medium">Category:</Text>
                  <div className="bg-ui-bg-subtle p-2 rounded border border-ui-border-base mt-1">
                    Accessories → Storage
                  </div>
                </div>
                <div>
                  <Text className="font-medium">Collection:</Text>
                  <div className="bg-ui-bg-subtle p-2 rounded border border-ui-border-base mt-1">
                    XMAX Parts
                  </div>
                </div>
              </div>
            </div>

            {/* Bad Example */}
            <div className="p-6 border border-ui-border-error bg-ui-bg-base rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <ExclamationCircle className="w-5 h-5 text-ui-fg-error" />
                <Heading level="h3" className="text-ui-fg-base">
                  ❌ Hindari yang Ini
                </Heading>
              </div>
              <div className="space-y-3 text-sm text-ui-fg-muted">
                <div>
                  <Text className="font-medium">Title:</Text>
                  <div className="bg-gray-800 p-2 rounded border mt-1">
                    "Top Case" <span className="text-xs">(terlalu umum)</span>
                  </div>
                </div>
                <div>
                  <Text className="font-medium">Handle:</Text>
                  <div className="bg-gray-800 p-2 rounded border mt-1 font-mono text-xs">
                    top-case-1{" "}
                    <span className="text-xs">(tidak deskriptif)</span>
                  </div>
                </div>
                <div>
                  <Text className="font-medium">Category:</Text>
                  <div className="bg-gray-800 p-2 rounded border mt-1">
                    Uncategorized{" "}
                    <span className="text-xs">(tidak ada kategori)</span>
                  </div>
                </div>
                <div>
                  <Text className="font-medium">Collection:</Text>
                  <div className="bg-gray-800 p-2 rounded border mt-1">
                    None <span className="text-xs">(tidak ada koleksi)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Template */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-3">
              📝 Template Description
            </Heading>
            <div className="bg-ui-bg-subtle p-4 rounded-lg text-sm font-mono">
              <div className="space-y-2">
                <div>
                  <strong>Premium Top Case 45L untuk XMAX 250 Connected</strong>
                </div>
                <div></div>
                <div>
                  <strong>Spesifikasi:</strong>
                </div>
                <div>• Kapasitas: 45 Liter</div>
                <div>• Material: ABS Premium dengan finishing Matt</div>
                <div>• Warna: Matt Black</div>
                <div>• Lock system: Central lock</div>
                <div></div>
                <div>
                  <strong>Kompatibilitas:</strong>
                </div>
                <div>✅ XMAX 250 Connected (2020-2024)</div>
                <div>✅ XMAX 250 ABS (2019-2024)</div>
                <div></div>
                <div>
                  <strong>Fitur:</strong>
                </div>
                <div>• Easy installation dengan mounting kit</div>
                <div>• Weather resistant</div>
                <div>• Reflector untuk safety</div>
              </div>
            </div>
          </div>

          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <div className="flex gap-3">
              <LightBulb className="w-5 h-5 text-ui-fg-interactive flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-ui-fg-base mb-1">
                  Tips untuk SEO dan Conversion:
                </Text>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Gunakan nama part + model motor di title</div>
                  <div>
                    • Include spesifikasi teknis (ukuran, material, warna)
                  </div>
                  <div>• Sebutkan kompatibilitas dengan model dan tahun</div>
                  <div>• Tambahkan fitur utama yang menjadi selling point</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "variants",
      title: "Step 3: Setup Product Variants",
      icon: "🎨",
      description:
        "Setup varian produk berdasarkan warna, ukuran, dan kompatibilitas model",
      content: (
        <div className="space-y-6">
          {/* Variant Strategy Overview */}
          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <Text className="font-medium mb-2 text-ui-fg-base">
              📋 Variant Strategy untuk Parts Yamaha:
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-ui-fg-interactive">
                  🎨 By Color
                </div>
                <div className="text-xs text-ui-fg-muted">
                  Hitam, Merah, Putih
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-ui-fg-interactive">
                  📏 By Size
                </div>
                <div className="text-xs text-ui-fg-muted">S, M, L, XL</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-ui-fg-interactive">
                  🏍️ By Model
                </div>
                <div className="text-xs text-ui-fg-muted">Aerox, NMAX, R15</div>
              </div>
            </div>
          </div>

          {/* Example 1: Color Variants */}
          <div className="space-y-3">
            <Text className="font-medium text-lg">
              Example 1: Top Case XMAX (Multi Color)
            </Text>
            <Text className="text-sm text-ui-fg-muted mb-3">
              Seperti produk Tokopedia - satu produk dengan beberapa pilihan
              warna
            </Text>

            <div className="space-y-3">
              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    Matt Black 45L
                  </Text>
                  <Badge color="grey">Default</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-ui-fg-base">
                  <div>
                    <strong>SKU:</strong> TC-XMAX250-45L-BLK
                  </div>
                  <div>
                    <strong>Price:</strong> Rp 1,250,000
                  </div>
                  <div>
                    <strong>Stock:</strong> 25 pcs
                  </div>
                  <div>
                    <strong>Weight:</strong> 2.5 kg
                  </div>
                </div>
              </div>

              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    Matt Red 45L
                  </Text>
                  <Badge color="red">Color Variant</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-ui-fg-base">
                  <div>
                    <strong>SKU:</strong> TC-XMAX250-45L-RED
                  </div>
                  <div>
                    <strong>Price:</strong> Rp 1,250,000
                  </div>
                  <div>
                    <strong>Stock:</strong> 15 pcs
                  </div>
                  <div>
                    <strong>Weight:</strong> 2.5 kg
                  </div>
                </div>
              </div>

              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    Matt White 45L
                  </Text>
                  <Badge color="blue">Color Variant</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-ui-fg-base">
                  <div>
                    <strong>SKU:</strong> TC-XMAX250-45L-WHT
                  </div>
                  <div>
                    <strong>Price:</strong> Rp 1,250,000
                  </div>
                  <div>
                    <strong>Stock:</strong> 20 pcs
                  </div>
                  <div>
                    <strong>Weight:</strong> 2.5 kg
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Example 2: Model Compatibility */}
          <div className="space-y-3">
            <Text className="font-medium text-lg">
              Example 2: Brake Pad (Multi Model)
            </Text>
            <Text className="text-sm text-ui-fg-muted mb-3">
              Satu jenis part cocok untuk beberapa model motor dengan tahun
              berbeda
            </Text>

            <div className="space-y-3">
              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    For NMAX 155 (2015-2019)
                  </Text>
                  <Badge color="blue">Old Series</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-ui-fg-base">
                  <div>
                    <strong>SKU:</strong> BPD-NMAX155-15-19-FRT
                  </div>
                  <div>
                    <strong>Price:</strong> Rp 250,000
                  </div>
                  <div>
                    <strong>Stock:</strong> 50 pcs
                  </div>
                  <div>
                    <strong>Compatible:</strong> NMAX 155 2015-2019
                  </div>
                </div>
              </div>

              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    For NMAX 155 (2020-2024)
                  </Text>
                  <Badge color="green">New Series</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-ui-fg-base">
                  <div>
                    <strong>SKU:</strong> BPD-NMAX155-20-24-FRT
                  </div>
                  <div>
                    <strong>Price:</strong> Rp 280,000
                  </div>
                  <div>
                    <strong>Stock:</strong> 30 pcs
                  </div>
                  <div>
                    <strong>Compatible:</strong> NMAX 155 2020-2024
                  </div>
                </div>
              </div>

              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    For Aerox 155 (All Years)
                  </Text>
                  <Badge color="purple">Universal</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-ui-fg-base">
                  <div>
                    <strong>SKU:</strong> BPD-AEROX155-ALL-FRT
                  </div>
                  <div>
                    <strong>Price:</strong> Rp 275,000
                  </div>
                  <div>
                    <strong>Stock:</strong> 40 pcs
                  </div>
                  <div>
                    <strong>Compatible:</strong> Aerox 155 All Years
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Variant Options Setup */}
          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <Text className="font-medium mb-3 text-ui-fg-base">
              ⚙️ Setup Variant Options di Medusa:
            </Text>
            <div className="space-y-2 text-sm text-ui-fg-muted">
              <div>
                <strong>1. Color Option:</strong> Buat option "Color" dengan
                values: Black, Red, White, Blue
              </div>
              <div>
                <strong>2. Size Option:</strong> Buat option "Size" dengan
                values: S, M, L, XL, One Size
              </div>
              <div>
                <strong>3. Model Option:</strong> Buat option "Model" dengan
                values: NMAX 155, Aerox 155, R15 V3, XMAX 250
              </div>
              <div>
                <strong>4. Year Option:</strong> Buat option "Year" dengan
                values: 2015-2019, 2020-2024, All Years
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "sku-guide",
      title: "Step 4: SKU Pattern & Management",
      icon: "🏷️",
      description:
        "Panduan SKU pattern BRM dan menggunakan SKU Management tools",
      content: (
        <div className="space-y-6">
          {/* SKU Pattern */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              🏷️ BRM SKU Pattern
            </Heading>
            <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4 mb-4">
              <div className="font-mono text-lg text-center font-bold text-ui-fg-base">
                [XXX]-[XXXXX]-[XX] (Pattern Analysis)
              </div>
              <div className="text-center text-sm text-ui-fg-muted mt-2">
                Based on examples: BBW-F840E-12, BS7-F11D0-00, BLS-F8338-00
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="font-medium mb-2">
                  Observed Pattern Structure:
                </Text>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-ui-bg-subtle rounded">
                    <strong>Segment 1 (3 characters):</strong> Likely part
                    category
                    <div className="text-xs text-ui-fg-muted mt-1">
                      BBW, BS7, BLS from examples above
                    </div>
                  </div>
                  <div className="p-2 bg-ui-bg-subtle rounded">
                    <strong>Segment 2 (5 characters):</strong> Specific part
                    identifier
                    <div className="text-xs text-ui-fg-muted mt-1">
                      F840E, F11D0, F8338 from examples above
                    </div>
                  </div>
                  <div className="p-2 bg-ui-bg-subtle rounded">
                    <strong>Segment 3 (2 characters):</strong> Appears to be
                    version/revision
                    <div className="text-xs text-ui-fg-muted mt-1">
                      00, 12 - likely version numbers
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Text className="font-medium mb-2">
                  Pattern Suggestions for BRM:
                </Text>
                <div className="space-y-1 text-sm">
                  <div>Follow similar 3-5-2 character pattern</div>
                  <div>Use consistent prefix for part types</div>
                  <div>Middle section for model/specific ID</div>
                  <div>Last 2 digits for version/revision</div>
                  <div className="mt-3 p-2 bg-ui-bg-subtle rounded text-xs">
                    <strong>Note:</strong> These are observed patterns, not
                    official Yamaha standards. Adapt the format to suit your
                    inventory needs while maintaining consistency.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SKU Examples */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              📋 SKU Examples yang Benar
            </Heading>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Single Product, Multiple Variants */}
                <div className="p-4 border border-ui-border-strong bg-ui-bg-subtle rounded-lg max-w-md">
                  <Text className="font-medium text-ui-fg-base mb-2">
                    🔧 Brake Pad NMAX (Multiple Variants)
                  </Text>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Front Ceramic:</span>
                      <Badge color="blue">BBW-F840E-12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Front Standard:</span>
                      <Badge color="blue">BBW-F840A-00</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rear Ceramic:</span>
                      <Badge color="blue">BBW-R840E-12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Rear Standard:</span>
                      <Badge color="blue">BBW-R840A-00</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medusa SKU Uniqueness Info */}
              <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
                <div className="flex gap-3">
                  <ExclamationCircle className="w-5 h-5 text-ui-fg-error flex-shrink-0 mt-0.5" />
                  <div>
                    <Text className="font-medium text-ui-fg-base mb-1">
                      ⚠️ Important: SKU Uniqueness di Medusa
                    </Text>
                    <div className="text-sm text-ui-fg-muted space-y-2">
                      <div>
                        • <strong>SKU harus UNIQUE</strong> di seluruh sistem
                        Medusa
                      </div>
                      <div>
                        • Tidak boleh ada 2 product variants dengan SKU yang
                        sama
                      </div>
                      <div>• Medusa akan error jika ada duplicate SKU</div>
                      <div>
                        • Best practice: Gunakan pattern yang konsisten seperti
                        contoh di atas
                      </div>
                      <div>
                        • Tips: Test dengan 1-2 produk dulu sebelum bulk import
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "inventory",
      title: "Step 5: Inventory & Stock Management",
      icon: "📦",
      description:
        "Setup inventory tracking, stock levels, dan alerts untuk setiap variant",
      content: (
        <div className="space-y-6">
          {/* Inventory Settings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-600 rounded-lg bg-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Text className="text-sm">📊</Text>
                </div>
                <Heading level="h3">Inventory Settings</Heading>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span>Track Inventory:</span>
                  <Badge color="green">✅ ON</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Allow Backorder:</span>
                  <Badge color="red">❌ OFF</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Low Stock Alert:</span>
                  <Badge color="orange">⚠️ 5 pcs</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Auto Reorder:</span>
                  <Badge color="blue">🔄 Manual</Badge>
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-600 rounded-lg bg-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Text className="text-sm">🏪</Text>
                </div>
                <Heading level="h3">Stock Locations</Heading>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Main Warehouse:</span>
                  <Badge color="blue">180 pcs</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shop Display:</span>
                  <Badge color="green">20 pcs</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Reserved:</span>
                  <Badge color="orange">5 pcs</Badge>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center font-medium">
                  <span>Available:</span>
                  <Badge color="purple">195 pcs</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Level Examples */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              📈 Stock Level Strategy
            </Heading>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-ui-border-base rounded-lg p-3 bg-ui-bg-subtle">
                  <Text className="font-medium text-ui-fg-base">
                    Fast Moving
                  </Text>
                  <Text className="text-xs text-ui-fg-muted mb-2">
                    Brake Pad, Air Filter
                  </Text>
                  <div className="space-y-1 text-xs">
                    <div>
                      Min Stock: <strong>20-30 pcs</strong>
                    </div>
                    <div>
                      Max Stock: <strong>100-150 pcs</strong>
                    </div>
                    <div>
                      Alert at: <strong>15 pcs</strong>
                    </div>
                  </div>
                </div>

                <div className="border border-ui-border-base rounded-lg p-3 bg-ui-bg-subtle">
                  <Text className="font-medium text-ui-fg-base">
                    Medium Moving
                  </Text>
                  <Text className="text-xs text-ui-fg-muted mb-2">
                    Fairing, Windshield
                  </Text>
                  <div className="space-y-1 text-xs">
                    <div>
                      Min Stock: <strong>10-15 pcs</strong>
                    </div>
                    <div>
                      Max Stock: <strong>50-75 pcs</strong>
                    </div>
                    <div>
                      Alert at: <strong>8 pcs</strong>
                    </div>
                  </div>
                </div>

                <div className="border border-ui-border-base rounded-lg p-3 bg-ui-bg-subtle">
                  <Text className="font-medium text-ui-fg-base">
                    Slow Moving
                  </Text>
                  <Text className="text-xs text-ui-fg-muted mb-2">
                    CDI, Special Parts
                  </Text>
                  <div className="space-y-1 text-xs">
                    <div>
                      Min Stock: <strong>3-5 pcs</strong>
                    </div>
                    <div>
                      Max Stock: <strong>20-30 pcs</strong>
                    </div>
                    <div>
                      Alert at: <strong>2 pcs</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Workflow */}
          <div className="p-6 border border-gray-600 rounded-lg bg-gray-800">
            <Heading level="h3" className="mb-4">
              🔄 Inventory Workflow
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="font-medium mb-2">📥 Stock In Process:</Text>
                <div className="space-y-2 text-sm">
                  <div>1. Receive supplier delivery</div>
                  <div>2. Quality check dan count</div>
                  <div>3. Update stock di Admin Panel</div>
                  <div>4. Generate barcode labels</div>
                  <div>5. Place in designated location</div>
                </div>
              </div>

              <div>
                <Text className="font-medium mb-2">📤 Stock Out Process:</Text>
                <div className="space-y-2 text-sm">
                  <div>1. Order received dari customer</div>
                  <div>2. Stok otomatis di-reserve</div>
                  <div>3. Pick & pack from location</div>
                  <div>4. Stok otomatis dikurangi saat shipped</div>
                  <div>5. Low stock alert jika perlu</div>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <div className="flex gap-3">
              <ExclamationCircle className="w-5 h-5 text-ui-fg-error flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-ui-fg-base mb-1">
                  ⚠️ Critical Inventory Rules:
                </Text>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Never allow negative inventory (backorder OFF)</div>
                  <div>
                    • Set minimum stock 5-10 pcs untuk fast-moving items
                  </div>
                  <div>• Review dan update stock levels monthly</div>
                  <div>• Setup notification alerts untuk low stock</div>
                  <div>• Regular stock audit untuk accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "pricing",
      title: "Step 6: Pricing Strategy & Launch",
      icon: "💰",
      description: "Setup pricing strategy dan launch produk ke marketplace",
      content: (
        <div className="space-y-6">
          {/* Pricing Structure */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              💰 Pricing Structure
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="w-12 h-12 bg-ui-bg-base rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Text className="text-lg">💵</Text>
                </div>
                <Text className="font-medium">Retail Price</Text>
                <div className="text-xl font-bold text-ui-fg-interactive my-1">
                  Rp 250,000
                </div>
                <Text className="text-xs text-ui-fg-muted">Customer pays</Text>
              </div>

              <div className="text-center p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="w-12 h-12 bg-ui-bg-base rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Text className="text-lg">🏷️</Text>
                </div>
                <Text className="font-medium">Compare Price</Text>
                <div className="text-xl font-bold text-ui-fg-muted line-through my-1">
                  Rp 320,000
                </div>
                <Text className="text-xs text-ui-fg-muted">OEM/competitor</Text>
              </div>

              <div className="text-center p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="w-12 h-12 bg-ui-bg-base rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Text className="text-lg">📃</Text>
                </div>
                <Text className="font-medium">Savings</Text>
                <div className="text-xl font-bold text-ui-fg-base my-1">
                  22%
                </div>
                <Text className="text-xs text-ui-fg-muted">Customer saves</Text>
              </div>
            </div>
          </div>

          {/* Price Categories */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              📃 Price Categories by Part Type
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="border rounded p-3">
                  <Text className="font-medium">🔧 Engine Parts</Text>
                  <div className="text-sm text-gray-300 space-y-1 mt-1">
                    <div>Brake Pad: Rp 200k - 400k</div>
                    <div>CDI Unit: Rp 300k - 800k</div>
                    <div>Air Filter: Rp 50k - 150k</div>
                  </div>
                </div>

                <div className="border rounded p-3">
                  <Text className="font-medium">🎨 Body Parts</Text>
                  <div className="text-sm text-gray-300 space-y-1 mt-1">
                    <div>Fairing Set: Rp 800k - 2M</div>
                    <div>Windshield: Rp 300k - 600k</div>
                    <div>Top Case: Rp 1M - 1.5M</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="border rounded p-3">
                  <Text className="font-medium">⚡ Electrical</Text>
                  <div className="text-sm text-gray-300 space-y-1 mt-1">
                    <div>Spark Plug: Rp 30k - 100k</div>
                    <div>Coil: Rp 200k - 500k</div>
                    <div>Wiring: Rp 150k - 300k</div>
                  </div>
                </div>

                <div className="border rounded p-3">
                  <Text className="font-medium">🏆 Premium Parts</Text>
                  <div className="text-sm text-gray-300 space-y-1 mt-1">
                    <div>Performance Kit: Rp 2M - 5M</div>
                    <div>Racing Parts: Rp 1M - 3M</div>
                    <div>Custom Parts: Quote based</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Launch Checklist */}
          <div className="p-6 border border-gray-600 rounded-lg bg-gray-800">
            <Heading level="h3" className="mb-4">
              🚀 Pre-Launch Checklist
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="font-medium mb-2">✅ Product Ready:</Text>
                <div className="space-y-1 text-sm">
                  <div>□ Product title & description complete</div>
                  <div>□ High-quality images uploaded (min 5)</div>
                  <div>□ All variants configured dengan SKU</div>
                  <div>□ Stock levels set untuk each variant</div>
                  <div>□ Pricing strategy implemented</div>
                </div>
              </div>

              <div>
                <Text className="font-medium mb-2">🎯 Marketing Ready:</Text>
                <div className="space-y-1 text-sm">
                  <div>□ SEO keywords di title & description</div>
                  <div>□ Product categories assigned</div>
                  <div>□ Collections configured</div>
                  <div>□ Related products linked</div>
                  <div>□ Promotion campaigns set (if any)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <LightBulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-blue-900 mb-2">
                  💡 Pricing Best Practices:
                </Text>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>
                    • Research competitor pricing untuk "Compare At" price
                  </div>
                  <div>• Consider dealer/bulk pricing untuk B2B customers</div>
                  <div>• Factor shipping costs dalam profit calculation</div>
                  <div>
                    • Update prices regularly berdasarkan supplier costs
                  </div>
                  <div>• Monitor conversion rates dan adjust accordingly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "bulk-import",
      title: "Step 7: Bulk Import Products dengan CSV",
      icon: "📁",
      description:
        "Import produk dalam jumlah besar menggunakan CSV import yang sudah tersedia di Medusa",
      content: (
        <div className="space-y-6">
          {/* Implementation Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex gap-3">
              <InformationCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-green-900 mb-1">
                  ✅ Fitur Bulk Import Native Tersedia di Medusa v2
                </Text>
                <div className="text-sm text-green-800 space-y-1">
                  <div>
                    • Medusa v2 <strong>sudah menyediakan</strong> fitur CSV
                    bulk import
                  </div>
                  <div>• Fitur ini tersedia langsung di Admin Panel</div>
                  <div>
                    • Template CSV sudah disediakan di direktori templates
                  </div>
                  <div>
                    • Import produk dalam jumlah besar dengan mudah dan cepat
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Import Overview */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              📁 Bulk Import Overview
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="font-medium mb-2">
                  Kapan Menggunakan Bulk Import:
                </Text>
                <div className="space-y-1 text-sm text-ui-fg-muted">
                  <div>• Import 10+ produk sekaligus</div>
                  <div>• Migrasi dari marketplace lain</div>
                  <div>• Update mass pricing/inventory</div>
                  <div>• Import dari supplier catalog</div>
                </div>
              </div>
              <div>
                <Text className="font-medium mb-2">Keuntungan:</Text>
                <div className="space-y-1 text-sm text-ui-fg-muted">
                  <div>• Hemat waktu dibanding input manual</div>
                  <div>• Konsistensi data terjaga</div>
                  <div>• Error handling & validasi otomatis</div>
                  <div>• Laporan impor untuk troubleshooting</div>
                </div>
              </div>
            </div>
          </div>

          {/* Akses Menu Import */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              🏗️ Cara Akses Menu Import di Admin Panel
            </Heading>
            <div className="space-y-4">
              <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
                <Text className="font-medium mb-2">
                  Langkah-langkah Akses Menu Import:
                </Text>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span>Buka Admin Panel BRM Commerce</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span>
                      Klik menu <strong>Products</strong> di sidebar
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <span>
                      Klik tombol <strong>Import Products</strong> di pojok
                      kanan atas
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <span>Upload file CSV dengan format yang benar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                      5
                    </div>
                    <span>Tunggu proses validasi dan import selesai</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Format CSV Lengkap - FIXED CLEAN VERSION */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              📋 Format File CSV Medusa v2 (26 Kolom)
            </Heading>
            <Text className="text-sm text-ui-fg-muted mb-4">
              Berikut adalah daftar lengkap semua kolom dalam file CSV import
              sesuai format Medusa v2. Kolom dengan{" "}
              <Badge color="red" size="xsmall">
                Required
              </Badge>{" "}
              wajib diisi.
            </Text>

            {/* Clean scrollable table */}
            <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-ui-bg-base border-b border-ui-border-base">
                    <tr>
                      <th className="text-left p-3 font-medium text-ui-fg-base">
                        #
                      </th>
                      <th className="text-left p-3 font-medium text-ui-fg-base min-w-[180px]">
                        Kolom
                      </th>
                      <th className="text-left p-3 font-medium text-ui-fg-base min-w-[80px]">
                        Status
                      </th>
                      <th className="text-left p-3 font-medium text-ui-fg-base min-w-[180px]">
                        Contoh
                      </th>
                      <th className="text-left p-3 font-medium text-ui-fg-base min-w-[200px]">
                        Keterangan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ui-border-base">
                    {/* PRODUCT FIELDS */}
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">1</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_title*
                      </td>
                      <td className="p-3">
                        <Badge color="red" size="xsmall">
                          Required
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        Brake Pad NMAX 155
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Nama produk yang jelas
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">2</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_handle
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        brake-pad-nmax-155
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        URL slug (otomatis jika kosong)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">3</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_description
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        Premium brake pad...
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Deskripsi lengkap produk
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">4</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_category
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        brake-system
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Kategori (harus sudah ada)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">5</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_collection
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        nmax-parts
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Collection (harus sudah ada)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">6</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_tags
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        brake;nmax;yamaha
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Tags (pisahkan dengan ;)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">7</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_status*
                      </td>
                      <td className="p-3">
                        <Badge color="red" size="xsmall">
                          Required
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        published
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        published atau draft
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">8</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_thumbnail
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        https://img.url/thumb.jpg
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        URL gambar thumbnail
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">9</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        product_images
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        url1.jpg;url2.jpg
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Multiple URLs (pisahkan dengan ;)
                      </td>
                    </tr>

                    {/* SEPARATOR */}
                    <tr className="bg-ui-bg-base">
                      <td colSpan={5} className="p-2 text-center">
                        <Badge color="blue" className="font-semibold">
                          VARIANT FIELDS
                        </Badge>
                      </td>
                    </tr>

                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">10</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_title*
                      </td>
                      <td className="p-3">
                        <Badge color="red" size="xsmall">
                          Required
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        Front Ceramic
                      </td>
                      <td className="p-3 text-ui-fg-muted">Nama varian</td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">11</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_sku*
                      </td>
                      <td className="p-3">
                        <Badge color="red" size="xsmall">
                          Required
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        BPD-NMAX155-FRT-CER
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        SKU unik (tidak boleh duplikat)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">12</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_price*
                      </td>
                      <td className="p-3">
                        <Badge color="red" size="xsmall">
                          Required
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        275000
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Harga dalam angka (tanpa titik/koma)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">13</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_compare_price
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        350000
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Harga coret (compare price)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">14</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_weight
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        0.5
                      </td>
                      <td className="p-3 text-ui-fg-muted">Berat dalam kg</td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">15</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_length
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        10
                      </td>
                      <td className="p-3 text-ui-fg-muted">Panjang dalam cm</td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">16</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_width
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        8
                      </td>
                      <td className="p-3 text-ui-fg-muted">Lebar dalam cm</td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">17</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_height
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        3
                      </td>
                      <td className="p-3 text-ui-fg-muted">Tinggi dalam cm</td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">18</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_stock*
                      </td>
                      <td className="p-3">
                        <Badge color="red" size="xsmall">
                          Required
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        50
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Jumlah stok (integer)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">19</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_allow_backorder
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        false
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        true/false untuk pre-order
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">20</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_track_inventory
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        true
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        true/false tracking stok
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">21</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_option_color
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        Matt Black
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Pilihan warna varian
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">22</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_option_size
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        45L
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Pilihan ukuran varian
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">23</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_option_model
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        NMAX 155
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Model motor compatible
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">24</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_option_year
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        2015-2024
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Tahun motor compatible
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">25</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_option_position
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        Front
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Posisi part (Front/Rear/Left/Right)
                      </td>
                    </tr>
                    <tr className="hover:bg-ui-bg-base-hover transition-colors">
                      <td className="p-3 text-ui-fg-subtle">26</td>
                      <td className="p-3 font-mono text-ui-fg-base">
                        variant_option_material
                      </td>
                      <td className="p-3">
                        <Badge color="grey" size="xsmall">
                          Optional
                        </Badge>
                      </td>
                      <td className="p-3 text-ui-fg-subtle font-mono text-xs">
                        Ceramic
                      </td>
                      <td className="p-3 text-ui-fg-muted">
                        Material/bahan produk
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clean Important Notes */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex gap-3">
                  <ExclamationCircle className="w-5 h-5 text-ui-fg-error flex-shrink-0 mt-0.5" />
                  <div>
                    <Text className="font-medium text-ui-fg-base mb-2">
                      🔴 Kolom Wajib (6 kolom):
                    </Text>
                    <div className="space-y-1 text-sm text-ui-fg-muted">
                      <div>1. product_title*</div>
                      <div>7. product_status*</div>
                      <div>10. variant_title*</div>
                      <div>11. variant_sku*</div>
                      <div>12. variant_price*</div>
                      <div>18. variant_stock*</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex gap-3">
                  <InformationCircle className="w-5 h-5 text-ui-fg-interactive flex-shrink-0 mt-0.5" />
                  <div>
                    <Text className="font-medium text-ui-fg-base mb-2">
                      📌 Tips Pengisian:
                    </Text>
                    <div className="space-y-1 text-sm text-ui-fg-muted">
                      <div>
                        • <strong>SKU harus unik</strong> di seluruh sistem
                      </div>
                      <div>
                        • <strong>Harga tulis angka</strong>: 275000 bukan
                        275,000
                      </div>
                      <div>
                        • <strong>Boolean values</strong>: true atau false
                        (lowercase)
                      </div>
                      <div>
                        • <strong>Multiple values</strong>: pisahkan dengan
                        semicolon (;)
                      </div>
                      <div>
                        • <strong>Kategori & Collection</strong>: buat dulu
                        sebelum import
                      </div>
                      <div>
                        • <strong>Kosongkan kolom Optional</strong> jika tidak
                        ada data
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contoh Data */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              🎨 Contoh Data dengan Variants
            </Heading>
            <div className="space-y-4">
              <Text className="text-ui-fg-muted">
                Berikut contoh data produk Brake Pad dengan 2 varian (Front dan
                Rear):
              </Text>

              <div className="bg-ui-bg-subtle p-4 rounded-lg overflow-x-auto">
                <div className="space-y-2 text-sm font-mono">
                  <div className="grid grid-cols-6 gap-2 font-bold">
                    <span>Product Title</span>
                    <span>Variant Title</span>
                    <span>Variant SKU</span>
                    <span>Variant Option 1 Name</span>
                    <span>Variant Option 1 Value</span>
                    <span>Variant Price IDR</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <span>Brake Pad Ceramic NMAX 155</span>
                    <span>Front Ceramic</span>
                    <span>BPD-NMAX155-FRT-CER</span>
                    <span>Position</span>
                    <span>Front</span>
                    <span>275000</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    <span>Brake Pad Ceramic NMAX 155</span>
                    <span>Rear Ceramic</span>
                    <span>BPD-NMAX155-RR-CER</span>
                    <span>Position</span>
                    <span>Rear</span>
                    <span>275000</span>
                  </div>
                </div>
              </div>
              <Text className="text-sm text-ui-fg-muted mt-2">
                <strong>Catatan:</strong> Untuk produk dengan multiple varian,
                gunakan baris yang sama untuk Product Title tetapi beda Variant
                Title dan Variant SKU.
              </Text>
            </div>
          </div>

          {/* Tips Persiapan */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              🚀 Tips Persiapan Import
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <Text className="font-medium">Download Template</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Gunakan template resmi di folder templates</div>
                  <div>• Pastikan file CSV menggunakan UTF-8 encoding</div>
                  <div>• Gunakan spreadsheet editor (Excel/Google Sheets)</div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <Text className="font-medium">Persiapkan Data</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Verifikasi semua SKU unique</div>
                  <div>• Pastikan semua harga dalam format angka</div>
                  <div>• Kategori dan collection harus sudah ada</div>
                  <div>• Siapkan semua URL gambar (jika ada)</div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <Text className="font-medium">Tes & Validasi</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Mulai dengan 5-10 produk dulu</div>
                  <div>• Cek hasil import di Admin Panel</div>
                  <div>• Verifikasi semua data tampil dengan benar</div>
                  <div>• Baru lakukan import untuk semua produk</div>
                </div>
              </div>
            </div>
          </div>

          {/* Template & Sample Files */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              📥 Download Template & Contoh File
            </Heading>
            <div className="space-y-6">
              {/* Template Files */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-ui-bg-interactive rounded-lg flex items-center justify-center">
                      <Text className="text-lg text-ui-fg-on-color">📝</Text>
                    </div>
                    <div>
                      <Text className="font-medium text-ui-fg-base">
                        Template Kosong
                      </Text>
                      <Text className="text-sm text-ui-fg-muted">
                        Untuk input data Anda sendiri
                      </Text>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-mono bg-ui-bg-base p-2 rounded border border-ui-border-base">
                      bulk-import-template.csv
                    </div>
                    <Text className="text-xs text-ui-fg-muted">
                      Template kosong dengan 26 kolom lengkap sesuai format
                      Medusa v2. Header sudah benar, tinggal isi data produk
                      Anda.
                    </Text>
                    <Button
                      variant="primary"
                      size="base"
                      className="w-full"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "/templates/bulk-import-template.csv";
                        link.download = "bulk-import-template.csv";
                        link.click();
                      }}
                    >
                      📥 Download Template Kosong
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-ui-bg-interactive rounded-lg flex items-center justify-center">
                      <Text className="text-lg text-ui-fg-on-color">📊</Text>
                    </div>
                    <div>
                      <Text className="font-medium text-ui-fg-base">
                        Contoh Data BRM
                      </Text>
                      <Text className="text-sm text-ui-fg-muted">
                        10 produk siap import
                      </Text>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-mono bg-ui-bg-base p-2 rounded border border-ui-border-base">
                      contoh-data-brm-import.csv
                    </div>
                    <Text className="text-xs text-ui-fg-muted">
                      Sample data lengkap 10 produk BRM Yamaha Parts dengan 21
                      varian. Perfect untuk testing dan sebagai referensi.
                    </Text>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="base"
                        className="flex-1"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = "/templates/contoh-data-brm-import.csv";
                          link.download = "contoh-data-brm-import.csv";
                          link.click();
                        }}
                      >
                        📥 Download
                      </Button>
                      <Button
                        variant="secondary"
                        size="base"
                        onClick={() => {
                          window.open(
                            "/templates/contoh-data-brm-import.csv",
                            "_blank",
                          );
                        }}
                      >
                        👁️ Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Data Overview */}
              <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
                <Text className="font-medium mb-3">
                  📊 Apa yang ada dalam Sample Data:
                </Text>
                <div className="text-sm text-ui-fg-muted">
                  <p className="mb-3">
                    File <strong>contoh-data-brm-import.csv</strong> berisi{" "}
                    <span className="font-bold text-ui-fg-base">
                      10 produk BRM Yamaha Parts
                    </span>{" "}
                    dengan total{" "}
                    <span className="font-bold text-ui-fg-base">21 varian</span>
                    :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                          4
                        </span>
                        <span>Brake Pad NMAX 155 (Ceramic & Standard)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>CDI Unit R15 V3 (Racing & Standard)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>Top Case XMAX 250 45L (3 warna)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                          3
                        </span>
                        <span>Windshield Aerox 155 (2 tinggi, 2 warna)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Fairing Set Aerox 155 (2 warna)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Brake Disc Aerox 155 (Front & Rear)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>
                          Air Filter NMAX 155 (Standard & Performance)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
                          1
                        </span>
                        <span>Exhaust System R15 V3 (Racing)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                          2
                        </span>
                        <span>Side Mirror XMAX 250 (Left & Right)</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex gap-2">
                      <div className="text-yellow-600">💡</div>
                      <div className="text-xs text-yellow-800">
                        <strong>Tips:</strong> Download sample file untuk
                        melihat contoh pengisian yang benar, kemudian edit
                        sesuai dengan produk Anda sendiri. Semua SKU sudah
                        unique dan format sudah sesuai!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <div className="flex gap-3">
              <ExclamationCircle className="w-5 h-5 text-ui-fg-error flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-ui-fg-base mb-1">
                  🛠️ Troubleshooting Common Errors:
                </Text>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>
                    • <strong>Duplicate SKU Error</strong> - Pastikan setiap SKU
                    unik di seluruh sistem
                  </div>
                  <div>
                    • <strong>Missing Required Fields</strong> - Pastikan semua
                    kolom wajib terisi
                  </div>
                  <div>
                    • <strong>Invalid Price Format</strong> - Harga harus berupa
                    angka tanpa separator
                  </div>
                  <div>
                    • <strong>Invalid Category</strong> - Kategori harus sudah
                    ada sebelum import
                  </div>
                  <div>
                    • <strong>Invalid Collection</strong> - Collection harus
                    sudah ada sebelum import
                  </div>
                  <div>
                    • <strong>Image Import Failed</strong> - URL gambar harus
                    valid dan dapat diakses
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Tips */}
          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <div className="flex gap-3">
              <LightBulb className="w-5 h-5 text-ui-fg-interactive flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-ui-fg-base mb-1">
                  💡 Tips Performa Import:
                </Text>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>
                    • <strong>Batasi ukuran file</strong> - Maksimal 500 produk
                    per file CSV
                  </div>
                  <div>
                    • <strong>Lakukan di jam sepi</strong> - Import saat traffic
                    rendah
                  </div>
                  <div>
                    • <strong>Siapkan backup</strong> - Backup data sebelum
                    import besar
                  </div>
                  <div>
                    • <strong>Split file besar</strong> - Bagi file di atas 500
                    produk menjadi beberapa
                  </div>
                  <div>
                    • <strong>Optimasi gambar</strong> - Kompres gambar agar
                    loading lebih cepat
                  </div>
                  <div>
                    • <strong>Monitor progress</strong> - Pantau progress saat
                    import
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "promotions",
      title: "Step 8: Promotions & Marketing Campaigns",
      icon: "🎁",
      description:
        "Setup discount codes, campaigns, dan promotional pricing untuk boost sales",
      content: (
        <div className="space-y-6">
          {/* Promotion Types Overview */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              🔁 Tipe Promosi yang Tersedia
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <Text className="text-lg">💰</Text>
                  <Text className="font-medium">Percentage Discount</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Diskon berdasarkan persentase</div>
                  <div>• Example: 15% off, 25% off</div>
                  <div>• Bisa untuk produk specific atau semua</div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <Text className="text-lg">💵</Text>
                  <Text className="font-medium">Fixed Amount</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Diskon nominal tetap</div>
                  <div>• Example: Rp 50,000 off</div>
                  <div>• Ideal untuk minimum purchase</div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <Text className="text-lg">🚚</Text>
                  <Text className="font-medium">Free Shipping</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Gratis ongkos kirim</div>
                  <div>• Dengan atau tanpa minimum</div>
                  <div>• Regional atau nationwide</div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Examples */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              📅 Campaign Examples untuk BRM
            </Heading>
            <div className="space-y-4">
              {/* Flash Sale */}
              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    ⚡ Flash Sale Weekend
                  </Text>
                  <Badge color="orange">Limited Time</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Type:</strong> Percentage Discount
                    <br />
                    <strong>Value:</strong> 20% off
                    <br />
                    <strong>Code:</strong> FLASH20
                  </div>
                  <div>
                    <strong>Duration:</strong> Friday - Sunday
                    <br />
                    <strong>Usage:</strong> 1x per customer
                    <br />
                    <strong>Target:</strong> All brake pads
                  </div>
                  <div>
                    <strong>Min Purchase:</strong> Rp 500,000
                    <br />
                    <strong>Max Discount:</strong> Rp 200,000
                    <br />
                    <strong>Status:</strong> Active
                  </div>
                </div>
              </div>

              {/* First Purchase */}
              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    🎉 New Customer Welcome
                  </Text>
                  <Badge color="green">Ongoing</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Type:</strong> Fixed Amount
                    <br />
                    <strong>Value:</strong> Rp 75,000 off
                    <br />
                    <strong>Code:</strong> WELCOME75
                  </div>
                  <div>
                    <strong>Duration:</strong> Permanent
                    <br />
                    <strong>Usage:</strong> First purchase only
                    <br />
                    <strong>Target:</strong> All products
                  </div>
                  <div>
                    <strong>Min Purchase:</strong> Rp 300,000
                    <br />
                    <strong>Max Usage:</strong> 1x per customer
                    <br />
                    <strong>Auto Apply:</strong> Yes
                  </div>
                </div>
              </div>

              {/* Free Shipping */}
              <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-medium text-ui-fg-base">
                    🚚 Free Shipping Campaign
                  </Text>
                  <Badge color="blue">Always Active</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Type:</strong> Free Shipping
                    <br />
                    <strong>Value:</strong> 100% shipping
                    <br />
                    <strong>Code:</strong> Auto-applied
                  </div>
                  <div>
                    <strong>Duration:</strong> Permanent
                    <br />
                    <strong>Usage:</strong> Unlimited
                    <br />
                    <strong>Target:</strong> All orders
                  </div>
                  <div>
                    <strong>Min Purchase:</strong> Rp 750,000
                    <br />
                    <strong>Regions:</strong> Jakarta, Surabaya
                    <br />
                    <strong>Display:</strong> Product pages
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Setup Process */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              ⚙️ Setup Process di Admin Panel
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <Text className="font-medium">Create Promotion</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Go to Promotions</div>
                  <div>• Click "Create Promotion"</div>
                  <div>• Choose promotion type</div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <Text className="font-medium">Configure Rules</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Set discount value</div>
                  <div>• Define conditions</div>
                  <div>• Target products/collections</div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <Text className="font-medium">Set Validity</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Start & end dates</div>
                  <div>• Usage limitations</div>
                  <div>• Customer restrictions</div>
                </div>
              </div>

              <div className="p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-ui-fg-interactive text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <Text className="font-medium">Launch & Monitor</Text>
                </div>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>• Activate promotion</div>
                  <div>• Share discount codes</div>
                  <div>• Monitor usage stats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className="p-6 border border-ui-border-base rounded-lg bg-ui-bg-base">
            <Heading level="h3" className="mb-4">
              🚀 Advanced Promotion Features
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="font-medium mb-3">Conditional Discounts:</Text>
                <div className="space-y-2 text-sm text-ui-fg-muted">
                  <div>
                    • <strong>Buy 2 Get 1:</strong> Beli 2 brake pad gratis 1
                  </div>
                  <div>
                    • <strong>Bulk Discount:</strong> 5+ items dapat 15% off
                  </div>
                  <div>
                    • <strong>Category Mix:</strong> Beli engine + brake parts
                  </div>
                  <div>
                    • <strong>Customer Tier:</strong> VIP customer 20% off
                  </div>
                </div>
              </div>

              <div>
                <Text className="font-medium mb-3">Auto-Applied Rules:</Text>
                <div className="space-y-2 text-sm text-ui-fg-muted">
                  <div>
                    • <strong>Free Shipping:</strong> Auto apply di Rp 750k
                  </div>
                  <div>
                    • <strong>Volume Discount:</strong> Auto 10% off 3+ items
                  </div>
                  <div>
                    • <strong>Loyalty Discount:</strong> Repeat customer bonus
                  </div>
                  <div>
                    • <strong>Regional Promo:</strong> Jakarta area special
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <div className="flex gap-3">
              <LightBulb className="w-5 h-5 text-ui-fg-interactive flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-ui-fg-base mb-1">
                  💡 Promotion Best Practices untuk BRM:
                </Text>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>
                    • <strong>Seasonal campaigns</strong> - Back to school,
                    Mudik season, Year-end
                  </div>
                  <div>
                    • <strong>Product bundling</strong> - Brake pad + brake
                    fluid combo
                  </div>
                  <div>
                    • <strong>Clear end dates</strong> - Create urgency dengan
                    countdown
                  </div>
                  <div>
                    • <strong>A/B test codes</strong> - SAVE20 vs DISKON20
                    performance
                  </div>
                  <div>
                    • <strong>Track performance</strong> - Monitor conversion
                    rates
                  </div>
                  <div>
                    • <strong>Stack carefully</strong> - Avoid over-discounting
                    profit
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Use Cases */}
          <div className="bg-ui-bg-subtle border border-ui-border-base rounded-lg p-4">
            <div className="flex gap-3">
              <ExclamationCircle className="w-5 h-5 text-ui-fg-interactive flex-shrink-0 mt-0.5" />
              <div>
                <Text className="font-medium text-ui-fg-base mb-1">
                  📋 Common BRM Promotion Use Cases:
                </Text>
                <div className="text-sm text-ui-fg-muted space-y-1">
                  <div>
                    • <strong>New product launch</strong> - 15% off first week
                  </div>
                  <div>
                    • <strong>Inventory clearance</strong> - 30% off old stock
                  </div>
                  <div>
                    • <strong>Customer retention</strong> - 10% off repeat
                    purchase
                  </div>
                  <div>
                    • <strong>Abandoned cart</strong> - Email dengan 5% discount
                  </div>
                  <div>
                    • <strong>Referral program</strong> - Refer friend get Rp
                    50k
                  </div>
                  <div>
                    • <strong>Bulk purchase</strong> - Toko/bengkel wholesale
                    pricing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Container className="divide-y p-0">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b bg-gray-900">
        <div className="space-y-1">
          <Heading level="h1" className="text-2xl text-white">
            Product Management Guide
          </Heading>
          <Text className="text-gray-300 text-sm">
            End-to-end workflow untuk BRM Yamaha parts — ikuti langkah dari
            struktur, produk, SKU, varian, stok, hingga harga.
          </Text>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="secondary" size="small">
            <CogSixTooth className="w-4 h-4 mr-1" /> Settings
          </Button>
          <Button variant="primary" size="small">
            <ShoppingCart className="w-4 h-4 mr-1" /> Create Product
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="px-6 py-6 bg-gray-800">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-600 rounded-lg bg-gray-700 text-center">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleSolid className="w-4 h-4 text-green-600" />
              <Text className="font-medium text-white">Structure</Text>
            </div>
            <Text className="text-xs text-gray-300">
              Categories, Collections, Locations
            </Text>
          </div>
          <div className="p-4 border border-gray-600 rounded-lg bg-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleSolid className="w-4 h-4 text-green-600" />
              <Text className="font-medium text-white">Product</Text>
            </div>
            <Text className="text-xs text-gray-300">
              Title, Images, Description
            </Text>
          </div>
          <div className="p-4 border border-gray-600 rounded-lg bg-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleSolid className="w-4 h-4 text-green-600" />
              <Text className="font-medium text-white">Variants</Text>
            </div>
            <Text className="text-xs text-gray-300">
              Color, Size, Model/Year
            </Text>
          </div>
          <div className="p-4 border border-gray-600 rounded-lg bg-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircleSolid className="w-4 h-4 text-green-600" />
              <Text className="font-medium text-white">Inventory & Price</Text>
            </div>
            <Text className="text-xs text-gray-300">Stock, SKU, Pricing</Text>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="px-6 py-8">
        <div className="max-w-5xl space-y-4">
          {workflowSteps.map((step) => (
            <div
              key={step.id}
              className="border border-gray-600 rounded-lg bg-gray-800 overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-ui-bg-subtle transition-colors"
                onClick={() => toggleSection(step.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-ui-bg-subtle rounded-lg flex items-center justify-center">
                    <Text className="text-lg">{step.icon}</Text>
                  </div>
                  <div>
                    <Heading level="h3" className="text-lg">
                      {step.title}
                    </Heading>
                    <Text className="text-sm text-gray-300 mt-1">
                      {step.description}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${expandedSection === step.id ? "rotate-90" : ""}`}
                  />
                </div>
              </div>

              {expandedSection === step.id && (
                <div className="px-6 pb-6 border-t bg-ui-bg-subtle">
                  <div className="pt-6">{step.content}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6 bg-gray-800 border-t">
        <div className="max-w-5xl">
          <Heading level="h3" className="mb-4">
            Quick Actions
          </Heading>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">
              <ShoppingCart className="w-4 h-4 mr-1" /> Create New Product
            </Button>
            <Button variant="secondary">
              <Tag className="w-4 h-4 mr-1" /> SKU Management
            </Button>
            <Button variant="secondary">
              <CogSixTooth className="w-4 h-4 mr-1" /> Manage Categories
            </Button>
            <Button variant="secondary">View Inventory</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

// Route configuration
export const config = defineRouteConfig({
  label: "Product Guide",
  icon: AcademicCap,
});

export default ProductGuidePage;
